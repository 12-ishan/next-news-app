'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { coupon, selectApplying, selectError, selectResponseMessage } from '@/redux/slice/couponSlice';

const CouponForm = () => {
  const [couponCode, setCouponCode] = useState('');
  const dispatch = useDispatch();

  const applying = useSelector(selectApplying);
  const error = useSelector(selectError);
  const responseMessage = useSelector(selectResponseMessage);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (responseMessage || error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setCouponCode(''); 
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [responseMessage, error]);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    dispatch(coupon({ couponCode }));
  };

  const errorMessage = error ? (typeof error === 'string' ? error : error.message || 'An error occurred') : null;

  return (
    <>
        <div className="col-md-12">
                
                <p>Enter your coupon code if you have one.</p>
      </div>
      <div className="col-md-8 mb-3 mb-md-2">
        <input
          type="text"
          className="form-control py-3"
          id="coupon"
          placeholder="Coupon Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </div>
      <div className="col-md-4">
        <button
          className="btn btn-primary btn-sm"
          onClick={handleApplyCoupon}
          disabled={applying}
        >
          {applying ? 'Applying...' : 'Apply Coupon'}
        </button>
      </div>

      {showMessage && (
        <div className="col-md-12 mt-3">
          <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`}>
            {errorMessage || responseMessage}
          </div>
        </div>
      )}
    </>
  );
};

export default CouponForm;
