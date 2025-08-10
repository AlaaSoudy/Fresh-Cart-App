import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WishlistContext = createContext();

export default function WishlistContextProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [numOfWishlistItems, setNumOfWishlistItems] = useState(0);

  async function getWishlist() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
        headers: {
          token: localStorage.getItem('token'),
        },
      });
      setWishlist(data.data);
      setNumOfWishlistItems(data.count || data.data.length);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getWishlist();
    }
  }, []);

  async function removeProductFromWishlist(productId) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found, please login');
      return;
    }

    try {
      const { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: localStorage.getItem('token'),
          },
        }
      );
      if (data.status === 'success') {
        setWishlist((prev) =>
          prev.filter((item) => item._id !== productId && item.id !== productId)
        );
      }
      return data;
    } catch (error) {
      console.error('Failed to remove product from wishlist:', error);
      return { status: 'fail' };
    }
  }

  return (
    <WishlistContext.Provider
      value={{ removeProductFromWishlist, wishlist, numOfWishlistItems, getWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
