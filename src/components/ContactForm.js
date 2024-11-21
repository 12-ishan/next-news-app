'use client'
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeContact, selectLoading } from '@/redux/slice/contactSlice';
import Loader from './layout/Loader';


const ContactForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const [showThankYou, setShowThankYou] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!formData.name) {
      errors.name = 'Please enter your name';
    }
    if (!formData.phone) {
      errors.phone = 'Please enter your phone number';
    }
    if (!formData.email) {
      errors.email = 'Please enter your email';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subject) {
      errors.subject = 'Please enter subject';
    }
    if (!formData.message) {
      errors.message = 'Please enter a message';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      await dispatch(storeContact(formData));
      setShowThankYou(true);

      setTimeout(() => {
        setShowThankYou(false);
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }
  };

return (
<>
    {/* <div className="col-md-6">
    <form onSubmit={submit}>
      <div>
        <input
          type="text"
          placeholder="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="text-danger">{errors.name}</span>}
      </div>
      <div>
        <input
          type="text"
          placeholder="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="text-danger">{errors.phone}</span>}
      </div>
      <div>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>
      <div>
        <input
          type="text"
          className="message-box"
          placeholder="Message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
        {errors.message && <span className="text-danger">{errors.message}</span>}
      </div>
      <div className="d-flex">
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'SEND'}
        </button>
        {loading && <Loader />}
      </div>
      <div>
        {showThankYou && (
          <div className="alert alert-success mt-3" role="alert">
            Thank You!
          </div>
        )}
      </div>
    </form>
  </div> */}


<div className="col-md-7">
              <form onSubmit={submit}>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_fname" className="text-black" >Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_fname" name="name" value={formData.name}
          onChange={handleChange} />
          {errors.name && <span className="text-danger">{errors.name}</span>}
                    </div>
                   
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">Email <span className="text-danger">*</span></label>
                      <input type="email" className="form-control" id="c_email"  name="email"
          value={formData.email}
          onChange={handleChange} placeholder="" />
          {errors.email && <span className="text-danger">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_email" className="text-black">Phone <span className="text-danger">*</span></label>
                      <input type="phone" className="form-control" id="phone"  name="phone"
          value={formData.phone}
          onChange={handleChange} placeholder="" />
          {errors.phone && <span className="text-danger">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_subject" className="text-black">Subject </label>
                      <input type="text" className="form-control" id="c_subject"   name="subject"
          value={formData.subject}
          onChange={handleChange} />
          {errors.subject && <span className="text-danger">{errors.subject}</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_message" className="text-black">Message </label>
                      <textarea id="c_message" cols="30" rows="7" className="form-control" name="message"
          value={formData.message}
          onChange={handleChange}></textarea>
          {errors.message && <span className="text-danger">{errors.message}</span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <button type="submit" className="btn btn-primary btn-lg btn-block"  disabled={loading}>{loading ? 'Sending...' : 'SEND'}</button>
                      {loading && <Loader />}
                    </div>
                  </div>
                  <div>
        {showThankYou && (
          <div className="alert alert-success mt-3" role="alert">
            Thank You!
          </div>
        )}
      </div>
                </div>
              </form>
            </div>
  </>
);
};

export default ContactForm;