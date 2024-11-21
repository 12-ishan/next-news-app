"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems, removeFromCart,   updateCart } from '@/redux/slice/loggedInCartSlice';
import { removeFromCartForGuestCustomer, updateGuestCart } from '@/redux/slice/cartSlice';
import Loader from './layout/Loader';

function ProductsInCart() {
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const loggedCartData = useSelector((state) => state.loggedInCart.cart) || [];
  const status = useSelector((state) => state.loggedInCart.status);
  const error = useSelector((state) => state.loggedInCart.error);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const getGuestCustomer = useSelector((state) => state.cart.cartItems) || [];
  const attributes = useSelector((state) => state.productDetail.attributes);
  
  useEffect(() => {
    if (token) {
      dispatch(fetchCartItems(token));
      setIsCartUpdated(false);
    }
  }, [token, isCartUpdated, dispatch]);

  const handleRemove = (id) => {
    console.log(id)
    if (token) {
      dispatch(removeFromCart({ id, token }));
      setIsCartUpdated(true);
    } else {
      dispatch(removeFromCartForGuestCustomer(id));
    }
  };

  // const handleQuantityChangeByPlus = (productId, quantity) => {
  //   console.log(quantity);
  //   if (token) {
  //     dispatch(updateCart({ product_id: productId, quantity, token }));
  //     setIsCartUpdated(true);
  //   }
  // };

  const handleQuantityChangeOperation = (productId, quantity) => {
    if (token) {
      dispatch(updateCart({ productDetail: { id: productId }, quantity, token }));
      setIsCartUpdated(true);
    }
    else {
    
      dispatch(updateGuestCart({ productId, newQuantity: quantity }));
    }
  };

 
  
  const handleQuantityChange = (productId, newQuantity) => {
    const item = loggedCartData.find((item) => item.product.id === productId);
    const guestCartItem = getGuestCustomer.find((item) => item.product.id === productId);
    if (item || guestCartItem) {
      if (newQuantity > item.quantity) {
        handleQuantityChangeOperation(productId, newQuantity);
      } 
    }
  };

  if (status === 'loading') {
    return <Loader/>;
  }

  if (status === 'failed') {
    return <p>Error: {error}</p>;
  }

 
  const cartData = token ? loggedCartData : getGuestCustomer;

  //const totalItems = cartData.length; 

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
                <th className="product-quantity">Quantity</th>
                <th className="product-total">Total</th>
                <th className="product-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartData.length > 0 ? (
                cartData.map((item) => (
                  <tr key={item.product_id || item.id}>
                    <td className="product-thumbnail">
                      <img src={item.product_image || item.product.image} alt={item.product_name || item.product.name} className="img-fluid" />
                      
                    </td>
                    {/* <td className="product-name">
                      <h2 className="h5 text-black">{item.product_name || item.product.name}</h2>
                      {item.selected_variation && 
                        Object.keys(item.selected_variation).filter(key => !isNaN(key)).map((key, index) => (
                          <div key={index}>
                            <strong>{item.selected_variation[key].attribute_name}:</strong> {item.selected_variation[key].option_name}
                          </div>
                        ))
                    }</td> */}
                    <td className="product-name">
                      <h2 className="h5 text-black">{item.product_name || item.product.name}</h2>

                      {item.attributes && 
                      Object.keys(item.attributes)
                      .filter((key) => !isNaN(key))
                      .map((key, index) => (
                        <div key={index}>
                          <strong>{item.attributes[key].attribute_name}:</strong>{" "}
                          {item.attributes[key].option_name}
                        </div>
                      ))

                      }
                      {item.selected_variation &&
                        Object.keys(item.selected_variation)
                          .filter((key) => !isNaN(key))
                          .map((key, index) => (
                            <div key={index}>
                              <strong>{item.selected_variation[key].attribute_name}:</strong>{" "}
                              {item.selected_variation[key].option_name}
                            </div>
                          ))}
                    </td>

                    <td>
                      &#8377;
                      {item.product_price || (item.product.price && item.selected_variation ? item.selected_variation.price : item.product.price)}
                    </td>
                    <td className='text-center'>
                      <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary js-btn-minus"
                            type="button"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleQuantityChangeOperation(item.product_id || item.id, item.quantity - 1);
                              }
                            }}
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity || item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.product_id || item.id, Number(e.target.value))
                          }
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary js-btn-plus"
                            type="button"
                            onClick={() =>
                              handleQuantityChangeOperation(item.product_id || item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>&#8377;{(item.product_price || (item.product.price && item.selected_variation ? item.selected_variation.price : item.product.price)) * item.quantity}</td>
                    <td className='text-center'>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        onClick={() => handleRemove(item.product_id || item.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Nothing in your cart.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </form>
    </div>
  );
}

export default ProductsInCart;