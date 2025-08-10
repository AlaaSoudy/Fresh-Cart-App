import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { cartContext } from '../../Context/Cart';
import { WishlistContext } from '../../Context/WishlistContext ';

export default function Wishlist() {
  const { wishlist, getWishlist, removeProductFromWishlist } = useContext(WishlistContext);
  //   const { removeProductFromCart, getUserCart } = useContext(cartContext);

  useEffect(() => {
    getWishlist();
  }, []);

  async function deleteElement(productId) {
    try {
      const resWishlist = await removeProductFromWishlist(productId);
      if (resWishlist.status === 'success') {
        toast.success('Product removed from wishlist');
        await getWishlist();
      } else {
        toast.error('Failed to remove product from wishlist');
      }
    } catch (error) {
      toast.error('Error occurred while removing product');
      console.error(error);
    }
  }

  if (!wishlist.length) {
    return (
      <div className="container py-5 text-center">
        <h3>Your wishlist is empty ❤️</h3>
        <Link to="/products" className="btn btn-success mt-3">
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Wishlist - Fresh Cart</title>
        <meta name="description" content="View and manage your wishlist items." />
        <meta name="keywords" content="wishlist, favorites, ecommerce, fresh cart" />
      </Helmet>

      <div className="container py-5">
        <h2 className="mb-4">My Wishlist ❤️</h2>
        <div className="row gy-4">
          {wishlist.map((item) => (
            <div className="col-md-3" key={item.id || item._id}>
              <div className="border rounded-3 shadow-sm p-2 text-center">
                <img src={item.imageCover} className="w-100 mb-2 rounded-2" alt={item.title} />
                <h6>{item.title}</h6>
                <p className="text-success">{item.price} EGP</p>
                <Link
                  to={`/ProductDetails/${item.id || item._id}`}
                  className="btn btn-outline-primary btn-sm w-100"
                >
                  View Details
                </Link>
                <button
                  onClick={() => deleteElement(item.id || item._id)}
                  className="btn btn-outline-danger mt-2 w-100"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
