import React from 'react'
import Link from 'next/link'

const Breadcrumb = ({ pageName }) => {
  return (
    <>
     <div className="bg-light py-3">
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-0"><Link href="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">{pageName}</strong></div>
        </div>
      </div>
    </div>  
    </>
  );
};

export default Breadcrumb;