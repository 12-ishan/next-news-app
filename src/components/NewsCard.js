import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsByCategory, resetNews } from '../redux/slice/newsSlice';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewsCard = ({ slug }) => {
  const dispatch = useDispatch();
  const { news, currentPage, totalPages, loading, error } = useSelector((state) => state.news);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    dispatch(resetNews());
    if (slug) {
      dispatch(fetchNewsByCategory({ slug, page: 1 }));
    }
  }, [slug, dispatch]);

  useEffect(() => {
    if (!isFetching || loading || currentPage >= totalPages) return;

    dispatch(fetchNewsByCategory({ slug, page: currentPage + 1 })).then(() => setIsFetching(false));
  }, [isFetching, loading, currentPage, totalPages, slug, dispatch]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !loading &&
      currentPage < totalPages
    ) {
      setIsFetching(true);  
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, currentPage]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (loading && currentPage === 1) {
    return (
      <div className="row align-item-start mb-5">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-sm-6 col-lg-4 mb-4">
            <Skeleton style={{ backgroundColor: '#e0e0e0' }} height={200} />
            {/* <Skeleton style={{ backgroundColor: '#e0e0e0' }} width={200} height={20} />
            <Skeleton style={{ backgroundColor: '#e0e0e0' }} width={250} height={15} /> */}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="row align-item-start justify-content-center mb-5">
      {news.length > 0 ? (
        news.map((data) => (
          <div key={data.id} className="col-sm-6 col-lg-4 mb-4">
            <div className="block-4 text-center border h-100 d-flex flex-column justify-content-start">
              <figure className="block-4-image">
                <Link href={`/blog/${data.slug}`}>
                  <Image className="img-fluid" src={data.media_name} alt={data.title} width={300} height={300} />
                </Link>
              </figure>
              <div className="block-4-text p-4">
                <h3 className="font-weight-bold">
                  <Link href={`/blog/${data.slug}`}>{data.title}</Link>
                </h3>
                <p className="text-primary">{data.meta_description}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <h1>No news available.</h1>
      )}

      {loading && currentPage > 1 && <div className="row align-item-start mb-5">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="col-sm-6 col-lg-4 mb-4">
            <Skeleton style={{ backgroundColor: '#e0e0e0' }} height={200} />
            <Skeleton style={{ backgroundColor: '#e0e0e0' }} width={200} height={20} />
            <Skeleton style={{ backgroundColor: '#e0e0e0' }} width={250} height={15} />
          </div>
        ))}
      </div>}
    </div>
  );
};

export default NewsCard;
