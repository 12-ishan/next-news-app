'use client';

import React from 'react';
import { Provider } from 'react-redux'; 
import store from '../redux/store';
import Header from '../components/layout/Header';
import Footer from '@/components/layout/Footer';
import Script from 'next/script';
import HeadComponent from '@/components/layout/HeadComponent';

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
      <HeadComponent/>
     
        <body>
        <div className="site-wrap">
       <Header/>
          <main>
            {children} 
          </main>
          <Footer/>
          </div>
        
            <Script src="/assets/js/jquery-3.3.1.min.js"></Script>
            <Script src="/assets/js/jquery-ui.js"></Script> 
            <Script src="/assets/js/popper.min.js"></Script>
            <Script src="/assets/js/bootstrap.min.js"></Script>
            <Script src="/assets/js/owl.carousel.min.js"></Script>
             <Script src="/assets/js/jquery.magnific-popup.min.js"></Script> 
             <Script src="/assets/js/aos.js"></Script>
            <Script src="/assets/js/main.js"></Script> 
            
        </body>
      </html>
      </Provider>
  );
}
