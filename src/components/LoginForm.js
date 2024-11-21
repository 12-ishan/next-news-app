import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; // Uncomment this
import { login } from '@/redux/slice/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      // .then(() => {
      //   // Redirect after successful login
      //   router.push('/my-profile');
      // })
      // .catch((error) => {
      //   // Handle login error
      //   console.error('Login failed:', error);
      // });
  };

  return (
    <div className="col-md-6">
      <h2 className="h3 mb-3 text-black">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="p-3 p-lg-5 border">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-12">
              <button
                type="submit"
                className="btn btn-primary btn-lg btn-block"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
