'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'next/navigation';
import { searchProducts } from '@/redux/slice/searchSlice';
import Loader from '@/components/layout/Loader';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/layout/breadcrumb';

const SearchResults = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('query'); 
  const dispatch = useDispatch();

  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchProducts(searchQuery)); 
    }
  }, [searchQuery, dispatch]);

  
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading search results.</div>;
  }

  return (
    <>
      <Breadcrumb pageName={searchQuery} />
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
              <div className="row">
                <div className="col-md-12 mb-5">
                 
                </div>
              </div>

              <div className="row mb-5">
                {status === 'succeeded' && (
                  results.length > 0 ? (
                    results.map((data) => (
                      <div key={data.id} className="col-sm-6 col-lg-4 mb-4">
                        <div className="block-4 text-center border">
                          <figure className="block-4-image">
                           
                            <Link href={`/${data.category_slug}/${data.slug}`}>
                              <Image
                                className="img-fluid"
                                src={data.media_name}
                                alt={data.name}
                                width={300}
                                height={300}
                              />
                            </Link>
                          </figure>
                          <div className="block-4-text p-4">
                            <h3>
                              <Link href={`/${data.category_slug}/${data.slug}`}>
                                {data.name}
                              </Link>
                            </h3>
                            <p className="text-primary font-weight-bold">
                              {data.title}
                            </p>
                            <p className="text-primary font-weight-bold">
                              {data.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No result found.</p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResults;
