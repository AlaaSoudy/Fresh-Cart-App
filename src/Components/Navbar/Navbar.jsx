import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../images/freshcart-logo.svg';
import { AuthContext } from '../../Context/authentication';
import { cartContext } from '../../Context/Cart';
import './Navbar.css';
import { WishlistContext } from '../../Context/WishlistContext ';

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { numOfWishlistItems } = useContext(WishlistContext);
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setDarkMode(savedTheme === 'dark');
  }, []);

  // const {token}= useContext(authcontext)
  const navigate = useNavigate();

  const { token, setToken } = useContext(AuthContext);
  const { numOfCartItems } = useContext(cartContext);

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    navigate('/login');
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-light"
      style={{
        paddingTop: '0.3rem',
        paddingBottom: '0.3rem',
        fontSize: '0.9rem',
        backgroundColor: darkMode ? '#1e1e1e' : '#f8f9fa',
        color: darkMode ? '#ffffff' : '#000000',
        transition: '0.3s ease',
      }}
    >
      <div className="container  d-flex justify-content-between align-items-center">
        <img className="navbar-logo " src={logo} alt="fresh cart logo" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarSupportedContent"
        >
          <div className="d-flex">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active fs-6 ms-2" to="/home">
                      Home
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6 position-relative" to="/cart">
                      Cart
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.7rem', minWidth: '18px', height: '18px' }}
                      >
                        {numOfCartItems}
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6 position-relative" to="/wishlist">
                      Wishlist
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: '0.7rem', minWidth: '18px', height: '18px' }}
                      >
                        {numOfWishlistItems || 0}
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/products">
                      Products
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/categories">
                      Categories
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/brands">
                      Brands
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link fs-6" to="/AllOrders">
                      Orders
                    </Link>
                  </li>
                </>
              ) : (
                ' '
              )}
            </ul>
          </div>

          <div className="d-flex align-items-center m-3">
            <ul className="navbar-nav mb-2 mb-lg-0 flex-row align-items-center">
              <ul className="navbar-nav mb-2 mb-lg-0 flex-row align-items-center">
                <li className="nav-item">
                  <a
                    href="https://www.instagram.com/YourInstagram"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fa-brands fa-instagram nav-link fs-6 me-2 cursor-pointer"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="https://www.facebook.com/YourFacebookPage"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <i className="fa-brands fa-facebook nav-link fs-6 me-2"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="https://www.tiktok.com/@YourTikTok"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <i className="fa-brands fa-tiktok nav-link fs-6 me-2"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="https://twitter.com/YourTwitter"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                  >
                    <i className="fa-brands fa-twitter nav-link fs-6 me-2"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="https://www.linkedin.com/in/YourLinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="fa-brands fa-linkedin nav-link fs-6 me-2"></i>
                  </a>
                </li>

                <li className="nav-item">
                  <a
                    href="https://www.youtube.com/channel/YourYouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube"
                  >
                    <i className="fa-brands fa-youtube nav-link fs-6 me-3"></i>
                  </a>
                </li>
              </ul>

              {token ? (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-outline-secondary me-2 fs-6" to="/Profile">
                      Profile
                    </Link>
                  </li>

                  {/* 
                            <li className='nav-item'>
            <span
              style={{ cursor: 'pointer' }}
              onClick={handleLogout}
              className='nav-link fs-5'
            >Logout</span>
          </li> */}
                  <li className="nav-item">
                    <button onClick={handleLogout} className="btn btn-outline-danger me-2 fs-6">
                      Logout
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="btn btn-outline-secondary rounded-circle p-2"
                      style={{
                        borderColor: darkMode ? '#fff' : '#000',
                        color: darkMode ? '#fff' : '#000',
                        width: '40px',
                        height: '40px',
                      }}
                      onClick={() => setDarkMode(!darkMode)}
                    >
                      {darkMode ? '☀️' : '🌙'}
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="btn btn-outline-success me-2 fs-6" to="/login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/register" className="btn btn-outline-primary me-2 fs-6">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
