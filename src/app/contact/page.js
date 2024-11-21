import React from 'react';
import Breadcrumb from '@/components/layout/breadcrumb'
import ContactForm from '@/components/ContactForm';

function Contact() {
  return (
    <>
    <Breadcrumb pageName="Contact"/>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2 className="h3 mb-3 text-black">Get In Touch</h2>
            </div>
            <ContactForm/>
            <div className="col-md-5 ml-auto">
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">New York</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">London</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
              <div className="p-4 border mb-3">
                <span className="d-block text-primary h6 text-uppercase">Canada</span>
                <p className="mb-0">203 Fake St. Mountain View, San Francisco, California, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
