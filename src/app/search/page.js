'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsSearch } from '@/redux/slice/searchSlice';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/layout/breadcrumb';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const SearchResults = ({ searchParams }) => {
  const searchQuery = searchParams.query;
  const dispatch = useDispatch();

  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);

  useEffect(() => {
    if (searchQuery) {
      dispatch(newsSearch(searchQuery));
    }
  }, [searchQuery, dispatch]);

  if (status === 'loading') {
    return (
      <>
        <div className="site-section">
          <div className="container">
            <div className="row align-item-start justify-content-center mb-5">
            <div className="col-md-9 order-2">
            <div className="row align-item-start justify-content-center mb-5">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="col-sm-6 col-lg-4 mb-4">
                  <Skeleton height={200} style={{ backgroundColor: '#e0e0e0' }} />
                  {/* <Skeleton width={200} height={20} style={{ backgroundColor: '#e0e0e0' }}  />
                  <Skeleton width={250} height={15} style={{ backgroundColor: '#e0e0e0' }}  /> */}
                </div>
              ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (status === 'failed') {
    return <div>Error loading search results.</div>;
  }

  return (
    <>
      <Breadcrumb pageName={searchQuery} />
      <div className="site-section">
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-md-9 order-2">
              <div className="row align-item-start justify-content-center mb-5">
                {status === 'succeeded' && (
                  results.length > 0 ? (
                    results.map((data) => (
                      <div key={data.id} className="col-sm-6 col-lg-4 mb-4">
                        <div className="block-4 text-center border h-100 d-flex flex-column justify-content-start">
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
                            <h3>
                              <Link href={`/blog/${data.slug}`}>{data.title}</Link>
                            </h3>
                            <p className="text-primary font-weight-bold">
                              {data.meta_description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <h1>No result found.</h1>
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
