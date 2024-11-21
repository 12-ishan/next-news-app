'use client'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsCategories } from '../redux/slice/newsCategoriesSlice';
import Link from 'next/link';

const NewsCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.newsCategory.categories);
  const status = useSelector((state) => state.newsCategory.status);
  const error = useSelector((state) => state.newsCategory.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchNewsCategories());
    }
  }, [status, dispatch]);

  return (
    <>
      {status === 'succeeded' && categories.length > 0 && (
        <>
          {categories.map((category) => {
            const hasSubcategories = category.subcategories && Object.keys(category.subcategories).length > 0;
            return (
              <li key={category.parent_category.id} className={hasSubcategories ? 'has-children' : ''}>
                <Link href={`/category/${category.parent_category.slug}`}>
                  {category.parent_category.name}
                </Link>
                {hasSubcategories && (
                  <ul className="dropdown">
                    {Object.values(category.subcategories).map((subcategory) => (
                      <li key={subcategory.id}>
                        <Link href={`/category/${subcategory.slug}`}>
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </>
      )}
    </>
  );
};

export default NewsCategories;
