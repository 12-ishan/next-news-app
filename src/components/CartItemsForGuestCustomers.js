import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { storeInCart, removeFromCart } from '@/redux/slice/cartSlice';

function ProductsInCart() {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.productDetail);

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchCartItems(token));
//       setIsCartUpdated(false);
//     }
//   }, [token, isCartUpdated, dispatch]);

//   const handleRemove = (cartItemId) => {
//     if (token) {
//       dispatch(removeFromCart({ cartItemId, token }));
//       setIsCartUpdated(true);
//     } else {
//       console.error('No token available');
//     }
//   };

//   const handleQuantityChangeByPlus = (productId, quantity) => {
//     if (token) {
//       dispatch(addToCartLoggedIn({ product_id: productId, quantity, token }));
//       setIsCartUpdated(true); 
//     }
//   };

//   const handleQuantityChangeByMinus = (productId, quantity) => {
//     if (token) {
//       dispatch(subtractItemFromCart({ productDetail: { id: productId }, quantity, token }));
//       setIsCartUpdated(true); 
//     }
//   };

//   const handleQuantityChange = (productId, newQuantity) => {
//     const item = loggedCartData.find((item) => item.product.id === productId);
//     if (item && token) {
//       if (newQuantity > item.quantity) {
//         handleQuantityChangeByPlus(productId, newQuantity);
//       } else if (newQuantity < item.quantity) {
//         handleQuantityChangeByMinus(productId, newQuantity);
//       }
//     }
//   };

//   if (status === 'loading') {
//     return <p>Loading...</p>;
//   }

//   if (status === 'failed') {
//     return <p>Error: {error}</p>;
//   }

  return (
    <div className="row mb-5">
      <form className="col-md-12">
        <div className="site-blocks-table">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th className="product-thumbnail">Image</th>
                <th className="product-name text-center align-middle">Product</th>
                <th className="product-price">Price</th>
                <th className="product-quantity">Quantity</th>
                <th className="product-total">Total</th>
                <th className="product-remove">Remove</th>
              </tr>
            </thead>
            <tbody>
              {loggedCartData.length > 0 ? (
                loggedCartData.map((item) => (
                  <tr>
                    <td className="product-thumbnail">
                      <img src={item.product.image} alt={item.product.name} className="img-fluid" />
                    </td>
                    <td className="product-name">
                      <h2 className="h5 text-black">{item.product.name}</h2>
                    </td>
                    <td>{item.product.price}</td>
                    <td>
                      <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                        <div className="input-group-prepend">
                          <button
                            className="btn btn-outline-primary js-btn-minus"
                            type="button"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleQuantityChangeByMinus(item.product.id, item.quantity - 1);
                              }
                            }}
                          >
                            &minus;
                          </button>
                        </div>
                        <input
                          type="text"
                          className="form-control text-center"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.product.id, Number(e.target.value))
                          } // Added onChange handler
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-outline-primary js-btn-plus"
                            type="button"
                            onClick={() =>
                              handleQuantityChangeByPlus(item.product.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td>{item.product.price * item.quantity}</td>
                    <td>
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
