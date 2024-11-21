'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails } from '@/redux/slice/productDetailSlice';
import Loader from '@/components/layout/Loader';
import { storeInCart } from '@/redux/slice/cartSlice';
import { addToCartLoggedIn } from '@/redux/slice/loggedInCartSlice';
import { addToWishList } from '@/redux/slice/wishListSlice';

const ProductPage = ({ params }) => {
  const { category, slug } = params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [loadingAddToWishList, setLoadingAddToWishList] = useState(false);
 

  const token = useSelector((state) => state.auth.token);
  const productDetail = useSelector((state) => state.productDetail.singleProduct);
  const productVariation = useSelector((state) => state.productDetail.productVariation);
  const attributes = useSelector((state) => state.productDetail.attributes);
  const maxPrice = useSelector((state) => state.productDetail.maxPrice);
  const status = useSelector((state) => state.productDetail.status);
  const error = useSelector((state) => state.productDetail.error);
  
 

  const [selectedOption, setSelectedOption] = useState({});
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [isPriceSelected, setIsPriceSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductDetails({ category, slug }));
  }, [dispatch, category, slug]);

  
  useEffect(() => {
    if (productVariation && productVariation.length > 0) {
      const initialSelections = {};
      const firstVariation = productVariation[0].attribute;

      firstVariation.forEach(attr => {
        initialSelections[attr.attribute_id] = attr.option_id;
      });

      setSelectedOption(initialSelections);
      setSelectedPrice(productVariation[0].price);
      setIsPriceSelected(true);
      setSelectedVariation(productVariation[0]); 
    }
  }, [productVariation]);

  
  const AttributeSelectHandler = (attributeId, optionId) => {
    const updatedSelections = {
      ...selectedOption,
      [attributeId]: optionId
    };

    setSelectedOption(updatedSelections);

    const matchedVariation = productVariation.find(variation =>
      variation.attribute.every(attr => updatedSelections[attr.attribute_id] === attr.option_id)
    );

    if (matchedVariation) {
      setSelectedPrice(matchedVariation.price);
      setIsPriceSelected(true);
      setSelectedVariation(matchedVariation); 
    } else {
      setSelectedPrice(null);
      setIsPriceSelected(false);
      setSelectedVariation(null); 
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const AddToCartHandler = () => {
    setLoading(true);
    
    if (productDetail.type === 1 && !selectedVariation) {
      setLoading(false);
      setErrorMessage('Please select a variation');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }

    if (token) {
      
      dispatch(
        addToCartLoggedIn({
          product_id: productDetail.id,
          variation_id: productDetail.type === 1 ? selectedVariation.id : null, 
          quantity,
          token,
        })
      )
        .then(() => {
          setLoading(false);
          setSuccessMessage('Product added to cart!');
          setTimeout(() => setSuccessMessage(''), 3000);
          
        })
        .catch(() => {
          setLoading(false);
          setErrorMessage('Failed to add to cart');
          setTimeout(() => setErrorMessage(''), 3000);
        });
      }
      else {
        // Prepare the productVariation object
        const productVariationData = productDetail.type === 1 
          ? {
              id: selectedVariation.id,
              attribute: selectedVariation,
              price: selectedVariation.price
            } 
          : null;
  
        dispatch(storeInCart({
          productDetail,
          productVariation: productVariationData,
          quantity,
        }));
    // } else {
      
    //   dispatch(storeInCart({
    //     productDetail,
    //     productVariation: productDetail.type === 1 ? selectedVariation.id : null,
    //     attribute: attributes,
    //     quantity,
    //   }));
      setLoading(false);
      setSuccessMessage('Product added to cart!');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };


  const AddToWishListHandler = () => {
    setLoadingAddToWishList(true);
  
    if (productDetail.type === 1 && !selectedVariation) {
      setLoadingAddToWishList(false);
      setErrorMessage('Please select a variation');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
  
    if (token) {
      dispatch(
        addToWishList({
          product_id: productDetail.id,
          variation_id: productDetail.type === 1 ? selectedVariation.id : null,
          token,
        })
      )
        .then(() => {
          setLoadingAddToWishList(false);
          setSuccessMessage('Product added to wish list!');
          setTimeout(() => setSuccessMessage(''), 3000);
        })
        .catch(() => {
          setLoadingAddToWishList(false);
          setErrorMessage('Failed to add to wish list');
          setTimeout(() => setErrorMessage(''), 3000);
        });
    } else {
      setLoadingAddToWishList(false);
      setErrorMessage('You need to log in to add items to your wish list');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };
  



  return (
    <div className="site-section">
      <div className="container">
        {status === 'loading' && <Loader />}
        {status === 'succeeded' && productDetail && (
          <div className="row">
            <div className="col-md-6">

              {productDetail.image && (
                <img src={productDetail.image} alt={productDetail.slug} className="img-fluid" />
              )}
            </div>
            <div className="col-md-6">
            <span className="d-flex justify-content-between align-items-center">
                <h2 className="text-black">{productDetail.name}</h2>
                <div className="d-flex flex-column align-items-center" onClick={AddToWishListHandler}>
                {loadingAddToWishList ? 'Adding...' : 'Add to Wish List'}
                <h2 className="icon icon-heart-o text-black"></h2>
              </div>
            </span>
            {/* {!loading && successMessage && (
                <div className={`mt-3 alert ${errorMessage ? 'alert-danger' : 'alert-success'}`}>
                  {successMessage}
                </div>
              )} */}

              {/* <span class ="col"><h2 className="text-black">{productDetail.name}</h2>
             <a ><span className="icon icon-heart-o"></span></a></span> */}
              <p className="mb-4">{productDetail.description}</p>
              <p>
                <strong className="text-primary h4">&#8377;
                  {productDetail.type === 1
                    ? (isPriceSelected ? selectedPrice : `${productDetail.price} - ${maxPrice}`)
                    : productDetail.price}
                </strong>
              </p>
              <div className="mb-1 row">
                {productDetail.type === 1 && attributes && attributes.length > 0 && (
                  attributes.map((attribute) => (
                    <div key={attribute.attribute_id} className="d-flex flex-column mr-3">
                      <span id={attribute.attribute_id} className="d-inline-block text-black font-weight-bold mb-2">
                        {attribute.attribute_name}
                      </span>
                      <div className="mb-1 d-flex">
                        {attribute.options && attribute.options.length > 0 ? (
                          attribute.options.map((option) => (
                            <label key={option.option_id} htmlFor={option.option_id} className="d-flex mr-3 mb-3">
                              <span className="d-inline-block mr-2" style={{ position: 'relative' }}>
                                <input
                                  type="radio"
                                  id={`id-${option.option_id}`}
                                  name={`attribute-${attribute.attribute_name}`}
                                  checked={selectedOption[attribute.attribute_id] === option.option_id}
                                  onChange={() => AttributeSelectHandler(attribute.attribute_id, option.option_id)}
                                />
                              </span>
                              <span className="d-inline-block text-black">{option.option_value}</span>
                            </label>
                          ))
                        ) : (
                          <p>No options available</p>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <div className="mb-5">
                <div className="input-group mb-3" style={{ maxWidth: '120px' }}>
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-primary js-btn-minus" type="button" onClick={() => {
                      if (quantity > 1) {
                        setQuantity(quantity - 1);
                      }
                    }}>
                      &minus;
                    </button>
                  </div>
                  <input
                    className="form-control text-center"
                    aria-label="Quantity"
                    value={quantity}
                    onChange={handleQuantityChange}
                  />
                  <div className="input-group-append">
                    <button className="btn btn-outline-primary js-btn-plus" type="button" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
              <button className="buy-now btn btn-sm btn-primary" onClick={AddToCartHandler}>
                {loading ? 'Adding...' : 'Add to Cart'}
              </button>
              {!loading && successMessage && (
                <div className={`mt-3 alert ${errorMessage ? 'alert-danger' : 'alert-success'}`}>
                  {successMessage}
                </div>
              )}
              {!loading && errorMessage && (
                <div className="mt-3 alert alert-danger">
                  {errorMessage}
                </div>
              )}

            </div>
          </div>
        )}
        {status === 'failed' && <p>{error.message}</p>}
      </div>
    </div>
  );
};

export default ProductPage;
