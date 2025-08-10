import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { cartContext } from '../../Context/Cart';
import toast from 'react-hot-toast';

export default function Payment() {
  const { cartId, clearDataFromCart } = useContext(cartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (!cartId) return;
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, {
        headers: { token: localStorage.getItem('token') },
      })
      .then((res) => {
        setCartItems(res.data.data.products || []);
      })
      .catch((err) => console.error(err));
  }, [cartId]);

  async function handleConfirmCashPayment(e) {
    e.preventDefault();
    try {
      const shippingAddress = {
        shippingAddress: {
          details: document.querySelector('#details').value,
          phone: document.querySelector('#phone').value,
          city: document.querySelector('#city').value,
        },
      };

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        shippingAddress,
        { headers: { token: localStorage.getItem('token') } }
      );

      if (data?.status === 'success') {
        toast.success('Payment confirmed successfully');
        setCartItems([]);
      } else {
        toast.error('Payment failed');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function confirmCardPayment(e) {
    e.preventDefault();
    try {
      const shippingAddress = {
        shippingAddress: {
          details: document.querySelector('#details').value,
          phone: document.querySelector('#phone').value,
          city: document.querySelector('#city').value,
        },
      };

      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        shippingAddress,
        { headers: { token: localStorage.getItem('token') } }
      );

      window.open(data?.session?.url, '_blank');
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  }

  return (
    <div className="container my-3">
      <h2>Payment</h2>

      {cartItems.length > 0 && (
        <div className="cart-preview mb-3 p-3 border rounded bg-light">
          <h5 className="mb-3">Your Cart</h5>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center border-bottom py-2"
            >
              <span>{item.product?.title || 'Unnamed Product'}</span>
              <span className="text-muted">x{item.count}</span>
              <span className="fw-bold">{item.price} EGP</span>
            </div>
          ))}
          <div className="mt-3 text-end fw-bold">
            Total: {cartItems.reduce((acc, item) => acc + item.price * item.count, 0)} EGP
          </div>
        </div>
      )}

      <form>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="city" placeholder="Enter your city" />
        </div>
        <div className="mb-3">
          <label htmlFor="details" className="form-label">
            Details
          </label>
          <textarea
            className="form-control"
            id="details"
            placeholder="Enter payment details"
          ></textarea>
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={(e) => {
              clearDataFromCart();
              handleConfirmCashPayment(e);
            }}
          >
            Confirm Cash Payment
          </button>

          <button
            type="submit"
            className="btn btn-primary me-2 fs-6"
            onClick={(e) => {
              confirmCardPayment(e);
            }}
          >
            Confirm Card Payment
          </button>
        </div>
      </form>
    </div>
  );
}
