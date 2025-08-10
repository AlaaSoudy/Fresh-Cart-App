import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import toast from 'react-hot-toast';
import { RotatingLines } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function AllOrders() {
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      getUserOrders(decoded.id);
    } catch (error) {
      toast.error('Invalid token.');
      setLoading(false);
    }
  }, []);

  async function getUserOrders(id) {
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
      setUserOrders(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '70vh' }}>
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (userOrders.length === 0) {
    return <p className="text-center">No orders found for the current user.</p>;
  }

  return (
    <>
      <Helmet>
        <title> Orders - Fresh Cart </title>
        <meta name="description" content="View and manage your orders at Fresh Cart." />
        <meta name="keywords" content="orders, fresh cart, order history, online shopping" />
      </Helmet>

      <div className="container py-4">
        <h2 className="mb-4">🛒 All Orders</h2>
        <h5 className="mb-3">
          Number of total Orders: <span className="badge bg-primary">{userOrders.length}</span>
        </h5>

        <div className="row">
          <div className="col-md-12">
            <table className="table table-bordered table-hover align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th style={{ width: '12%' }}>Order ID</th>
                  <th style={{ width: '12%' }}>Customer</th>
                  <th style={{ width: '10%' }}>Delivery Status</th>
                  <th style={{ width: '10%' }}>Payment Status</th>
                  <th style={{ width: '10%' }}>Total Price</th>
                  <th style={{ width: '12%' }}>Payment Method</th>
                  <th style={{ width: '34%' }}>Products</th>
                </tr>
              </thead>
              <tbody>
                {userOrders.map((order, idx) => (
                  <tr key={idx} style={{ fontSize: '0.9rem' }}>
                    <td>{order._id}</td>
                    <td>{order.user?.name || 'N/A'}</td>

                    <td>
                      {order.isDelivered ? (
                        <span className="badge bg-success">✅ Delivered</span>
                      ) : (
                        <span className="badge bg-warning text-dark">🚚 Pending</span>
                      )}
                    </td>

                    <td>
                      {order.isPaid ? (
                        <span className="badge bg-primary">💳 Paid</span>
                      ) : (
                        <span className="badge bg-danger">❌ Not Paid</span>
                      )}
                    </td>

                    <td>
                      <span className="fw-bold text-success">{order.totalOrderPrice} EGP</span>
                    </td>
                    <td>
                      {order.paymentMethodType === 'card' ? (
                        <span className="badge bg-info">💳 Card</span>
                      ) : (
                        <span className="badge bg-secondary">💵 Cash</span>
                      )}
                    </td>

                    <td>
                      <div className="d-flex flex-column gap-1">
                        {order.cartItems.map((item, index) => (
                          <div
                            key={index}
                            className="d-flex align-items-center border p-1 rounded shadow-sm bg-white"
                            style={{ transition: '0.3s', cursor: 'pointer' }}
                            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
                            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                          >
                            <img
                              src={item.product.imageCover}
                              alt={item.product?.title}
                              className="me-2 rounded"
                              style={{
                                width: '35px',
                                height: '35px',
                                objectFit: 'cover',
                                boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                              }}
                            />
                            <div>
                              <strong className="d-block" style={{ fontSize: '0.8rem' }}>
                                {item.product?.title}
                              </strong>
                              <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                                {item.count} pcs | {item.price} EGP
                              </small>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
