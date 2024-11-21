"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './layout/Loader';
import { fetchWishListItems, removeFromWishList } from '@/redux/slice/wishListSlice'; // Assuming you have these actions

function ProductsInWishList() {
  const dispatch = useDispatch();
  
  // Selectors from Redux state
  const token = useSelector((state) => state.auth.token);
  const wishListData = useSelector((state) => state.wishList.wishlist);
  console.log(wishListData)
  const status = useSelector((state) => state.wishList.status);
  const error = useSelector((state) => state.wishList.error);

  useEffect(() => {
    if (token) {
      dispatch(fetchWishListItems(token));  
    }
  }, [token, dispatch]);

  const handleRemove = (id) => {
    if (token) {
      dispatch(removeFromWishList({ id, token })); 
    }
  };

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="row mb-5">
      <form className="col-md-12">
        <div className="site-blocks-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="product-thumbnail">Image</th>
                <th className="product-name">Product</th>
                <th className="product-price">Price</th>
                <th className="product-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishListData && wishListData.length > 0 ? (
                wishListData.map((item) => (
                  <tr key={item.id}>
                    <td className="product-thumbnail">
                      <img className="img-fluid" src={item.product.image} alt={item.product.name} />
                    </td>
                    <td className="product-name">
                      <h2 className="h5 text-black">{item.product.name}</h2>
                      {item.selected_variation && Object.keys(item.selected_variation)
                        .filter(key => !isNaN(key))
                        .map((key, index) => (
                          <div key={index}>
                            <strong>{item.selected_variation[key].attribute_name}:</strong> {item.selected_variation[key].option_name}
                          </div>
                        ))}
                    </td>
                    <td>&#8377;{item.selected_variation ? item.selected_variation.price : item.product.price}
                    </td>
                    
                    <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">Your wishlist is empty.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default ProductsInWishList;
