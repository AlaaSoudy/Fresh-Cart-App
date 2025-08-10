import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/authentication';
import { Bars } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Login() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const formikobj = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validate: (values) => {
      const errors = {};
      if (!values.email) {
        errors.email = 'Email is required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      if (!values.password) {
        errors.password = 'Password is required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters';
      }
      return errors;
    },

    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://ecommerce.routemisr.com/api/v1/auth/signin',
          values
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        setToken(response.data.token);
        navigate('/home');
      } catch (error) {
        alert(error.response?.data?.message || 'Login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta
          name="description"
          content="Login to your account to access exclusive features and offers."
        />
        <meta name="keywords" content="login, user authentication, ecommerce" />
      </Helmet>

      <div className="m-auto w-50 py-3 rounded">
        <h2>Login Now:</h2>
        <form onSubmit={formikobj.handleSubmit} onReset={formikobj.handleReset}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={formikobj.values.email}
            onChange={formikobj.handleChange}
            onBlur={formikobj.handleBlur}
            disabled={isLoading}
            autoComplete="email"
          />
          {formikobj.touched.email && formikobj.errors.email && (
            <div className="text-danger">{formikobj.errors.email}</div>
          )}

          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            className="form-control mb-3"
            placeholder="Enter your password"
            value={formikobj.values.password}
            onChange={formikobj.handleChange}
            onBlur={formikobj.handleBlur}
            disabled={isLoading}
            autoComplete="current-password"
          />
          {formikobj.touched.password && formikobj.errors.password && (
            <div className="text-danger">{formikobj.errors.password}</div>
          )}

          <div className="d-flex justify-content-end align-items-center gap-2">
            {isLoading ? (
              <Bars height="40" width="40" color="#0AAD0A" ariaLabel="loading" visible={true} />
            ) : (
              <>
                <button type="submit" className="btn btn-primary rounded-2" disabled={isLoading}>
                  Login
                </button>
                <button type="reset" className="btn btn-secondary rounded-2" disabled={isLoading}>
                  Reset
                </button>
                <Link to="/reset-password" className="btn btn-link">
                  Forgot Password?
                </Link>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
