
'use client'
import React from 'react';
import Breadcrumb from '@/components/layout/breadcrumb';
import NewsCard from '@/components/NewsCard'

import { useSelector } from 'react-redux';

import { useState, useEffect } from 'react';

// export const metadata = {
//   title: 'Products',
// };

const Category = ({ params }) => {
  console.log(params);
  const { slug } = params;
  
  const news = useSelector((state) => state.news.news);
  console.log(news);

  const [renderComponent, setRenderComponent] = useState(null);
  console.log(renderComponent);

  useEffect(() => {
 
      setRenderComponent(<NewsCard slug={slug} />);
    
  }, [slug]);
  
  
 
  return (
    <>
      <Breadcrumb pageName= {slug} />
      <div className="site-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-9 order-2">
            

            {renderComponent}

            </div>

           
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;

