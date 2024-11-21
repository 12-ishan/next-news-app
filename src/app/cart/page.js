'use client'
import React from 'react'
import Breadcrumb from '@/components/layout/breadcrumb'
import ProductsInCart from '@/components/ProductsInCart';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import CouponForm from '@/components/CouponForm';

// export const metadata = {
//   title: 'Cart',
// };

function Cart() {

  const totalAmountOfLoggedInCustomer = useSelector((state) => state.loggedInCart.totalAmount);
  const totalAmountOfGuestCustomer = useSelector((state) => state.cart.totalAmount);
  const token = useSelector((state) => state.auth.token);
  const CartTotalAmount = token ? totalAmountOfLoggedInCustomer : totalAmountOfGuestCustomer;
  const coupon = useSelector((state) => state.coupon);

  return (
    <>
    <Breadcrumb pageName="Cart"/>
    <div className="site-section">
      <div className="container">
       <ProductsInCart/>

        <div className="row">
          <div className="col-md-6">
            <div className="row mb-5">
              {/* <div className="col-md-6 mb-3 mb-md-0">
                <button className="btn btn-primary btn-sm btn-block">Update Cart</button>
              </div> */}
              <div className="col-md-6">
                <button className="btn btn-outline-primary btn-sm btn-block"><Link href="/">Continue Shopping</Link></button>
              </div>
            </div>
            <div className="row">
            <label className="text-black h4" htmlFor="coupon">Coupon</label>
            <CouponForm/>
            </div>
            {/* <div className="row">
              <div className="col-md-12">
                <label className="text-black h4" htmlFor="coupon">Coupon</label>
                <p>Enter your coupon code if you have one.</p>
              </div>
              <div className="col-md-8 mb-3 mb-md-0">
                <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code"/>
              </div>
              <div className="col-md-4">
                <button className="btn btn-primary btn-sm">Apply Coupon</button>
              </div>
            </div> */}
          </div>
          <div className="col-md-6 pl-5">
            <div className="row justify-content-end">
              <div className="col-md-7">
                <div className="row">
                  <div className="col-md-12 text-right border-bottom mb-5">
                    <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <span className="text-black">Subtotal</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">&#8377;{CartTotalAmount}</strong>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Discount</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">&#8377;{coupon.amount}</strong>
                  </div>  
                </div>
                <div className="row mb-5">
                  <div className="col-md-6">
                    <span className="text-black">Total</span>
                  </div>
                  <div className="col-md-6 text-right">
                    <strong className="text-black">&#8377;{CartTotalAmount - coupon.amount}</strong>
                  </div>
                  
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <Link href="/checkout" className="btn btn-primary btn-lg py-3 btn-block" >Proceed To Checkout</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Cart