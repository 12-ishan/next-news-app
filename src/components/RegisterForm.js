'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerCustomer, selectRegistering, selectError, selectResponseMessage } from '../redux/slice/registerSlice';
import Loader from './layout/Loader'

const RegisterForm = () => {
  const dispatch = useDispatch();
  const registering = useSelector(selectRegistering);
  const error = useSelector(selectError);
  const responseMessage = useSelector(selectResponseMessage);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (responseMessage && !error) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
        setFormData({
          username: '',
          email: '',
          password: ''
        });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [responseMessage, error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(registerCustomer(formData));
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = (data) => {
    const errors = {};
    if (!data.username) errors.username = 'Username is required';
    if (!data.email) errors.email = 'Email is required';
    if (!data.password) errors.password = 'Password is required';
    return errors;
  };

  return (
    <div className="col-md-6">
      <h2 className="h3 mb-3 text-black">Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-3 p-lg-5 border">
          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="username" className="text-black">
                Username<span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <span className="text-danger">{errors.username}</span>}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="email" className="text-black">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
              {error && <span className="text-danger">{error}</span>}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-md-12">
              <label htmlFor="password" className="text-black">
                Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <button type="submit" className='btn btn-primary btn-lg btn-block' disabled={registering || !formData.username || !formData.email || !formData.password}>
                {registering ? 'Registering...' : 'Register'}
              </button>
              {registering && <Loader />}
            </div>
          </div>
          {showMessage && responseMessage && (
            <div className="form-group row">
              <div className="col-md-12">
                <div className={`alert ${error ? 'alert-danger' : 'alert-success'}`}>
                  {responseMessage}
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
