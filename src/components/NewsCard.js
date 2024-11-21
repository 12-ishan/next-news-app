'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsByCategory } from '../redux/slice/newsSlice';
//import Loader from './layout/Loader'; 
import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({ slug }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  console.log(news)
  const categorySlug = useSelector((state) => state.news.categorySlug);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);
 // const currentPage = useSelector((state) => state.news.currentPage);
  // const lastPage = useSelector((state) => state.news.lastPage);
  //const [loadingMore, setLoadingMore] = useState(false); 

  useEffect(() => {
   
    //dispatch(resetNews());
    dispatch(fetchNewsByCategory({ slug }));
  }, [slug]);

  // useEffect(() => {
   
  //   const handleScroll = () => {
     
  //     if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && currentPage < lastPage && !loadingMore) {
       
  //       setLoadingMore(true);
       
  //       dispatch(fetchProductsByCategory({ slug, page: currentPage + 1 }))
  //         .then(() => {
  //           setLoadingMore(false); 
  //         });
  //     }
  //   };


  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [currentPage, lastPage, dispatch, slug, loadingMore]);

  // if (status === 'loading' && !loadingMore) {
  //   return <Loader />;
  // }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(news)) {
    return <p>No news available.</p>;
  }

  return (
    <div className="row mb-5">
      {status === 'succeeded' && (
        news.length > 0 ? (
          news.map((data) => (
            <div key={data.id} className="col-sm-6 col-lg-4 mb-4">
              <div className="block-4 text-center border">
                <figure className="block-4-image">
                  <Link href={`/blog/${data.slug}`}>
                    <Image
                      className="img-fluid"
                      src={data.media_name}
                      alt={data.title}
                      width={300} 
                      height={300} 
                    />
                  </Link>
                </figure>
                <div className="block-4-text p-4">
                  <h3><Link href={`/blog/${data.slug}`}>{data.title}</Link></h3>
                  <p className="text-primary font-weight-bold">{data.meta_description}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No news available.</p>
        )
      )}
     
      {/* {loadingMore && <Loader />} */}
    </div>
  );
};

export default NewsCard;
