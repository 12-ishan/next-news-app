'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsDetails } from '@/redux/slice/newsDetailSlice';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsDetailPage = ({ params }) => {
  const { slug } = params;
  const dispatch = useDispatch();
  const newsDetail = useSelector((state) => state.newsDetail.newsDetail);
  const status = useSelector((state) => state.newsDetail.status);
  const error = useSelector((state) => state.newsDetail.error);

  useEffect(() => {
    dispatch(fetchNewsDetails({ slug }));
  }, [dispatch, slug]);

  return (
    <div className="site-section">
      <div className="container">
        {status === 'loading' && (
          <div className="row">
            <div className="col-md-6">
              <Skeleton height={300} width="100%" style={{ backgroundColor: '#e0e0e0' }} />
            </div>
            <div className="col-md-6">
              <Skeleton height={30} width="80%" style={{ marginBottom: '1rem', backgroundColor: '#e0e0e0' }} />
              <Skeleton height={20} width="60%" style={{ marginBottom: '0.5rem', backgroundColor: '#e0e0e0' }} />
              <Skeleton count={5} height={15} style={{ marginBottom: '0.5rem', backgroundColor: '#e0e0e0' }} />
            </div>
          </div>
        )}

        {status === 'succeeded' && newsDetail && (
          <div className="row">
            <div className="col-md-6">
              {newsDetail.image && (
                <Image
                  src={newsDetail.image}
                  alt={newsDetail.slug}
                  className="img-fluid"
                  width={900}
                  height={900}
                />
              )}
            </div>
            <div className="col-md-6">
              <span className="d-flex justify-content-between align-items-center">
                <h2 className="text-black">{newsDetail.title}</h2>
              </span>
              <p className="mb-4">{newsDetail.metaDescription}</p>
              <p className="mb-4">{newsDetail.description}</p>
            </div>
          </div>
        )}

        {status === 'failed' && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default NewsDetailPage;
