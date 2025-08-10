import React, { useState } from 'react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [showShareOptions, setShowShareOptions] = useState(false);

  const appLink = 'https://yourapp.com/download';

  function shareOnWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(
      'Download the FreshCart app here: ' + appLink
    )}`;
    window.open(url, '_blank');
  }

  function shareOnFacebook() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(appLink)}`;
    window.open(url, '_blank');
  }

  function shareOnLinkedIn() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      appLink
    )}`;
    window.open(url, '_blank');
  }

  function shareOnTwitter() {
    const url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      appLink
    )}&text=${encodeURIComponent('Download the FreshCart app!')}`;
    window.open(url, '_blank');
  }

  function openInstagram() {
    const instagramProfile = 'https://www.instagram.com/yourprofile';
    window.open(instagramProfile, '_blank');
  }

  function handleShareClick() {
    setShowShareOptions(!showShareOptions);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <footer className="footer bg-light py-5 border-top">
      <div className="container">
        <div className="text-center mb-3">
          <h5 className="fw-bold mb-1">Get the FreshCart app</h5>
          <p className="text-muted small mb-0">
            We will send you a link, open it on your phone to download the app.
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-2 app-link-row mb-2">
          <input
            type="email"
            className="form-control app-email"
            placeholder="Email .."
            aria-label="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button className="btn btn-success share-btn" onClick={handleShareClick}>
            Share App Link
          </button>
        </div>

        {showShareOptions && (
          <div className="share-options d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <button
              className="btn btn-outline-success"
              onClick={shareOnWhatsApp}
              aria-label="Share on WhatsApp"
            >
              WhatsApp
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={shareOnFacebook}
              aria-label="Share on Facebook"
            >
              Facebook
            </button>
            <button
              className="btn btn-outline-info"
              onClick={shareOnLinkedIn}
              aria-label="Share on LinkedIn"
            >
              LinkedIn
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={shareOnTwitter}
              aria-label="Share on Twitter"
            >
              Twitter
            </button>
            <button
              className="btn btn-outline-danger"
              onClick={openInstagram}
              aria-label="Open Instagram"
            >
              Instagram
            </button>
          </div>
        )}

        <hr className="my-3" />

        <p className="text-center text-muted small mt-3 mb-0">
          © 2025 Fresh Cart. All rights reserved. |{' '}
          <a href="https://wa.me/201234567890" className="text-success text-decoration-none">
            Contact us on WhatsApp
          </a>
        </p>
      </div>
    </footer>
  );
}
