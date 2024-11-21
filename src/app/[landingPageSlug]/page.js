'use client';
import React, { useEffect } from 'react';
import Breadcrumb from '@/components/layout/breadcrumb';
import { useDispatch, useSelector } from 'react-redux';
import { landingPages } from '@/redux/slice/landingPagesSlice';
import Loader from '@/components/layout/Loader';
import Link from 'next/link';
import Image from 'next/image';
import PageNotFound from '@/components/layout/PageNotFound';

function Page({ params }) {
    const { landingPageSlug } = params;
    const dispatch = useDispatch();

    const pageData = useSelector((state) => state.landingPage.data);
    const status = useSelector((state) => state.landingPage.status);
    const error = useSelector((state) => state.landingPage.error);

    useEffect(() => {
        if (landingPageSlug) {
            dispatch(landingPages(landingPageSlug));  
        }
    }, [dispatch, landingPageSlug]);

    if (status === 'loading') {
        return <Loader />;
    }

    if (status === 'failed') {
        return <div>{error}</div>;
    }

    return (
        <>
            {pageData && pageData.title ? (
                <>
                    <Breadcrumb pageName={pageData.title} />
                    <div className="site-section block-8">
                        <div className="container">
                            <div className="row justify-content-center mb-5">
                                <div className="col-md-7 site-section-heading text-center pt-4">
                                    <h2>{pageData.title}</h2>
                                </div>
                            </div>
                            <div className="row align-items-center">
                                <div className="col-md-12 col-lg-7 mb-5">
                                    <Link href="#">
                                        <Image
                                            className="img-fluid"
                                            src={pageData.image}
                                            alt={pageData.title}
                                            width={1000}
                                            height={1000}
                                        />
                                    </Link>
                                </div>
                                <div className="col-md-12 col-lg-5 text-center pl-md-5">
                                <h2><a href="#">50% less in all items</a></h2>
                                <p className="post-meta mb-4">By <a href="#">Carl Smith</a> <span className="block-8-sep">&bullet;</span> September 3, 2018</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam iste dolor accusantium facere corporis ipsum animi deleniti fugiat. Ex, veniam?</p>
                                <p><a href="#" className="btn btn-primary btn-sm">Shop Now</a></p>
                            </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <PageNotFound/>  
            )}
        </>
    );
}

export default Page;
