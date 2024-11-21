'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsDetails } from '@/redux/slice/newsDetailSlice';
import Loader from '@/components/layout/Loader';


const NewsDetailPage = ({ params }) => {
  const { slug } = params;
  const dispatch = useDispatch();
  const newsDetail = useSelector((state) => state.newsDetail.newsDetail);
  console.log(newsDetail);

  const status = useSelector((state) => state.newsDetail.status);
  const error = useSelector((state) => state.newsDetail.error);
  


  useEffect(() => {
    dispatch(fetchNewsDetails({ slug }));
  }, [dispatch, slug]);

  
  
 

 
  

 


  

  return (
    <div className="site-section">
      <div className="container">
        {status === 'loading' && <Loader />}
        {status === 'succeeded' && newsDetail && (
          <div className="row">
            <div className="col-md-6">

              {newsDetail.image && (
                <img src={newsDetail.image} alt={newsDetail.slug} className="img-fluid" />
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
