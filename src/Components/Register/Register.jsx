import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';

export default function Register() {
  const navigate = useNavigate();













  
  const formikobj = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },

    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = 'Required';
      } else if (values.name.length < 3) {
        errors.name = 'Name must be at least 3 characters long';
      }

      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }

      if (!values.password) {
        errors.password = 'Required';
      } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
      }

      if (!values.rePassword) {
        errors.rePassword = 'Confirm password is required';
      } else if (values.password !== values.rePassword) {
        errors.rePassword = 'Passwords do not match';
      }

      if (!values.phone) {
        errors.phone = 'Required';
      } else if (!/^\d{11}$/.test(values.phone)) {
        errors.phone = 'Phone number must be 11 digits';
      }

      return errors;
    },

    onSubmit: async (values) => {
      try {
        const response = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', {
          name: values.name,
          email: values.email,
          password: values.password,
          rePassword: values.rePassword,
          phone: values.phone,
        });
        console.log('Registration success:', response.data);
        navigate('/home');
      } catch (error) {
        console.error('Registration error:', error.response?.data);
        alert(error.response?.data?.message || 'Registration failed. Please try again.');
      }
    },
  });

  return (



<>


<Helmet>




<title >Register</title>
<meta name="description" content="Create a new account to access exclusive features and offers." />
<meta name="keywords" content="register, user authentication, ecommerce" />


</Helmet>











    <div className="m-auto w-75 py-3 rounded">
      <h2>Register Now:</h2>

      <form onSubmit={formikobj.handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          className="form-control mb-3"
          type="text"
          placeholder="Enter your name"
          value={formikobj.values.name}
          onChange={formikobj.handleChange}
          onBlur={formikobj.handleBlur}
          autoComplete="name"
        />
        {formikobj.touched.name && formikobj.errors.name && (
          <div className="text-danger">{formikobj.errors.name}</div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          className="form-control mb-3"
          type="email"
          placeholder="Enter your email"
          value={formikobj.values.email}
          onChange={formikobj.handleChange}
          onBlur={formikobj.handleBlur}
          autoComplete="email"
        />
        {formikobj.touched.email && formikobj.errors.email && (
          <div className="text-danger">{formikobj.errors.email}</div>
        )}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          className="form-control mb-3"
          type="password"
          placeholder="Enter your password"
          value={formikobj.values.password}
          onChange={formikobj.handleChange}
          onBlur={formikobj.handleBlur}
          autoComplete="new-password"
        />
        {formikobj.touched.password && formikobj.errors.password && (
          <div className="text-danger">{formikobj.errors.password}</div>
        )}

        <label htmlFor="rePassword">Confirm Password:</label>
        <input
          id="rePassword"
          name="rePassword"
          className="form-control mb-3"
          type="password"
          placeholder="Confirm your password"
          value={formikobj.values.rePassword}
          onChange={formikobj.handleChange}
          onBlur={formikobj.handleBlur}
          autoComplete="new-password"
        />
        {formikobj.touched.rePassword && formikobj.errors.rePassword && (
          <div className="text-danger">{formikobj.errors.rePassword}</div>
        )}

        <label htmlFor="phone">Phone:</label>
        <input
          id="phone"
          name="phone"
          className="form-control mb-3"
          type="tel"
          placeholder="Enter your phone number"
          value={formikobj.values.phone}
          onChange={formikobj.handleChange}
          onBlur={formikobj.handleBlur}
          autoComplete="tel"
        />
        {formikobj.touched.phone && formikobj.errors.phone && (
          <div className="text-danger">{formikobj.errors.phone}</div>
        )}

        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success m-2 rounded-2">
            Register
          </button>
          <button
            type="reset"
            className="btn btn-danger m-2 rounded-2"
            onClick={formikobj.handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
    </>
  );
}
