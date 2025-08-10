import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!email.trim()) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', {
        email: email.trim(),
      });
      toast.success('Reset code sent to your email');
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send reset code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyResetCode(e) {
    e.preventDefault();
    if (!resetCode.trim()) {
      toast.error('Please enter the reset code');
      return;
    }
    setLoading(true);
    try {
      await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', {
        resetCode: resetCode.trim(),
      });
      toast.success('Reset code verified');
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid reset code');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleResetPassword(e) {
    e.preventDefault();
    if (!newPassword.trim()) {
      toast.error('Please enter a new password');
      return;
    }
    setLoading(true);
    try {
      await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', {
        email: email.trim(),
        newPassword: newPassword.trim(),
      });
      toast.success('Password reset successfully!');
      setStep(1);
      setEmail('');
      setResetCode('');
      setNewPassword('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to reset password');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Reset Password</title>
        <meta name="description" content="Reset your password to regain access to your account." />
        <meta name="keywords" content="reset password, user authentication, ecommerce" />
      </Helmet>
      <div className="container mt-5 m-auto mb-5" style={{ maxWidth: '400px' }}>
        {step === 1 && (
          <>
            <h3 className="mb-4 text-center">Forgot Password</h3>
            <form onSubmit={handleForgotPassword}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h3 className="mb-4 text-center">Verify Reset Code</h3>
            <form onSubmit={handleVerifyResetCode}>
              <div className="mb-3">
                <label htmlFor="resetCode" className="form-label">
                  Reset Code
                </label>
                <input
                  type="text"
                  id="resetCode"
                  className="form-control"
                  placeholder="Enter the reset code"
                  value={resetCode}
                  onChange={(e) => setResetCode(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify Code'}
              </button>
            </form>
          </>
        )}

        {step === 3 && (
          <>
            <h3 className="mb-4 text-center">Reset Password</h3>
            <form onSubmit={handleResetPassword}>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
