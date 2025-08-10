import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const cartContext = createContext();

export function CartContextProvider({ children }) {
  const [cartProducts, setCartProducts] = useState(null);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  function getToken() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
    }
    return token;
  }

  async function clearDataFromCart() {
    const token = getToken();
    if (!token) return;

    try {
      await axios.delete('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });

      setCartProducts([]);
      setTotalCartPrice(0);
      setNumOfCartItems(0);

      return { status: 'success' };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { status: 'error' };
    }
  }

  async function updateProductQuantity(productId, count) {
    const token = getToken();
    if (!token) return;

    if (count < 1) {
      return removeProductFromCart(productId);
    }

    try {
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { productId, count },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      setCartProducts(data?.data?.products);
      setTotalCartPrice(data?.data?.totalCartPrice);
      setNumOfCartItems(data?.numOfCartItems);

      await getUserCart();
      return data;
    } catch (e) {
      console.error('Error updating product quantity:', e.response?.data || e.message);
      throw e;
    }
  }

  async function removeProductFromCart(productId) {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );

      await getUserCart();

      setNumOfCartItems(data?.numOfCartItems || 0);
      setTotalCartPrice(data?.data?.totalCartPrice || 0);
      setCartProducts(data?.data?.products || []);
      return data;
    } catch (e) {
      console.error('Error removing product from cart:', e);
      throw e;
    }
  }

  async function getUserCart() {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setCartProducts(data?.data?.products || []);
      setTotalCartPrice(data?.data?.totalCartPrice || 0);
      setNumOfCartItems(data?.numOfCartItems || 0);
      setCartId(data?.data?._id || null);
      return data;
    } catch (error) {
      console.log('Error fetching user cart:', error);
      throw error;
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  async function addProductToCart(productId) {
    const token = getToken();
    if (!token) return;

    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/cart',
        { productId },
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );

      await getUserCart();
      return data;
    } catch (e) {
      console.error('Error adding product to cart:', e);
      throw e;
    }
  }

  return (
    <cartContext.Provider
      value={{
        addProductToCart,
        getUserCart,
        removeProductFromCart,
        updateProductQuantity,
        clearDataFromCart,
        cartProducts,
        totalCartPrice,
        numOfCartItems,
        cartId,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
export default CartContextProvider;
