import React from 'react';
import errorImage from '../../images/error.svg';

export default function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center vh-100 mt-3 text-center"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa, #e9ecef)',
        padding: '20px',
      }}
    >
      <img
        src={errorImage}
        alt="Page Not Found"
        style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
      />

      <h1 className="mt-4 fw-bold text-danger">Oops! Page Not Found</h1>
      <p className="text-muted mb-4">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <a href="/" className="btn btn-primary btn-lg shadow">
        Back to Home
      </a>
    </div>
  );
}
