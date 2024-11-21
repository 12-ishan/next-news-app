'use client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { fetchProductsByfilter } from '@/redux/slice/productsFilterSlice';
import ProductCard from './ProductCard';
import FilteredProductsCards from './FilteredProductsCards';
import { useEffect } from 'react';

function ProductFilter({slug}) {
    const dispatch = useDispatch(); 
    const attributes = useSelector((state) => state.products.attributes) || []; 
    const status = useSelector((state) => state.products.status);
    const products = useSelector((state) => state.filterProducts.filteredproducts) || [];
    
   console.log(products)

    useEffect(() => {
        if (slug) {
            dispatch(fetchProductsByfilter({ slug }));
        }
    }, [dispatch, slug]);

    const FilterSelectHandler = (slug, optionId) => {
        if (slug && optionId) {
            dispatch(fetchProductsByfilter({ slug, optionId }));
        }
    }



    return (
        <>
        
        <div className="border p-4 rounded mb-4">
            <div className="mb-4">
                <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
                <div id="slider-range" className="border-primary"></div>
                <input type="text" name="text" id="amount" className="form-control border-0 pl-0 bg-white" disabled />
            </div>

            {status === 'succeeded' && (
                attributes.length > 0 ? (
                    attributes.map((data) => (
                        <div className="mb-4" key={data.attribute_id}>
                            <h3 className="mb-3 h6 text-uppercase text-black d-block">{data.attribute_name}</h3>
                            {Object.entries(data.options).length > 0 ? (
                                Object.entries(data.options).map(([optionId, optionValue]) => (
                                    <label key={optionId} htmlFor={`option_${optionId}`} className="d-flex">
                                        <input
                                            type="checkbox"
                                            id={`option_${optionId}`}
                                            className="mr-2 mt-1"
                                            onChange={() => FilterSelectHandler(slug, optionId)}  
                                            name={`option_${optionId}`}
                                        />
                                        <span className="text-black">{optionValue}</span>
                                    </label>
                                ))
                            ) : (
                                <p>No options available.</p>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No filter available.</p>
                )
            )}
        </div>
       
       
        </>
    );
}

export default ProductFilter;
