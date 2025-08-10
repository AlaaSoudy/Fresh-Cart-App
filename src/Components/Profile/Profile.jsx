import { useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/authentication';
import { Hourglass } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function Profile() {
  const { setToken } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    navigate('/login');
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error('Error decoding token:', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, []);

  console.log(user);

  if (loading) {
    return (
      <Hourglass
        visible={true}
        height="80"
        width="80"
        ariaLabel="hourglass-loading"
        wrapperStyle={{}}
        wrapperClass=""
        colors={['#306cce', '#72a1ed']}
      />
    );
  }

  if (!user) {
    return <p>No user data found. Please login.</p>;
  }

  return (
    <>
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="View and manage your profile information." />
        <meta name="keywords" content="profile, user information, account settings" />
      </Helmet>

      <div className="container mt-4">
        <h2 className="mb-3">👤 Profile</h2>
        <div className="card p-3">
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>User Id:</strong> {user.id}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Phone:</strong> {user.phone}
          </p>
          <button onClick={handleLogout} className="btn btn-outline-danger me-2 fs-6">
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
