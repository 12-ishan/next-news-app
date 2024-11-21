'use client';
import { generalSettings } from '@/redux/slice/generalSettingsSlice';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Loader from './layout/Loader';
import Link from 'next/link';

function HomePageHeader() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.generalSettings.data);
  console.log(data);
  const status = useSelector((state) => state.generalSettings.status);
  console.log(status);

  useEffect(() => {
      dispatch(generalSettings()); 
  }, []);

  
  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <div>Error loading search results.</div>;
  }


  return (
    <div className="site-blocks-cover"  style={{ backgroundImage: `url(${data.image})` }} >
    <div className="container">
      <div className="row align-items-start align-items-md-center justify-content-end">
        <div className="col-md-5 text-center text-md-left pt-5 pt-md-0">
          <h1 className="mb-2">{data.title}</h1>
          <div className="intro-text text-center text-md-left">
            <p className="mb-4">{data.meta_description}</p>
            {/* <p>
              <Link href='' className="btn btn-sm btn-primary">Shop Now</Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HomePageHeader