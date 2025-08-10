import React, { useContext } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import { ColorRing } from 'react-loader-spinner';

// import Categories from '../Categories/Categories';

import { Link } from 'react-router-dom';
import HomeSlider from '../Home/HomeSlider';
import { cartContext } from '../../Context/Cart';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function Products() {
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products');
  }

  const { addProductToCart } = useContext(cartContext);

  async function addToWishlist(productId) {
    try {
      const { data } = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        { productId },
        { headers: { token: localStorage.getItem('token') } }
      );
      toast.success(data.message || 'Added to wishlist');
    } catch (error) {
      toast.error('Failed to add to wishlist');
      console.error(error);
    }
  }

  async function addProduct(product) {
    const res = await addProductToCart(product.id);
    if (res && res.message) {
      toast.success(res.message);
    } else {
      toast.error('Failed to add product to cart');
    }
    console.log(res);
  }

  const { isLoading, isError, data } = useQuery('allProducts', getAllProducts);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="alert alert-danger" role="alert">
          Failed to load products. Please try again later.
        </div>
      </div>
    );
  }

  const products = data?.data?.data || [];

  return (
    <>
      <Helmet>
        <title>Products - Fresh Cart</title>
      </Helmet>

      <div className="container py-5">
        <h2 className="mb-4">Products</h2>

        <div className="row gx-0 mb-5">
          <div className="col-sm-9">
            <HomeSlider />
          </div>

          <div className="col-sm-3">
            <img
              style={{ width: '100%', height: '200px' }}
              src={require('../../images/grocery-banner-2.jpeg')}
              alt=""
              className="w-100"
            />

            <img
              style={{ width: '100%', height: '200px' }}
              src={require('../../images/grocery-banner.png')}
              alt=""
              className="w-100"
            />
          </div>
          {/* 
        <Categories /> */}
        </div>
        <div className="row gy-4 mt-4">
          {products.map((pro) => (
            <div className="col-md-2" key={pro._id}>
              <Link to={`/ProductDetails/${pro._id}`}>
                <div className="Product border rounded-3 shadow-sm p-2 text-center">
                  <img src={pro.imageCover} className="w-100 mb-2 rounded-2" alt={pro.title} />
                  <h6 className="main-color">{pro.category?.name || 'Category'}</h6>
                  <h6>{pro.title?.slice(0, 20) || 'Title'}</h6>
                  <div className="d-flex justify-content-between align-items-center">
                    <h6 className="text-success">{pro.price || 100} EGP</h6>
                    <p>
                      <span>
                        <i className="fa-solid fa-star text-warning"></i>
                      </span>{' '}
                      {pro.ratingsAverage}
                    </p>
                  </div>
                </div>
              </Link>
              <button
                onClick={() => addProduct(pro)}
                className="btn btn-outline-success btn-sm mt-2 w-100 p-2 mt-2 "
              >
                Add to Cart
              </button>
              <button
                onClick={() => addToWishlist(pro._id)}
                className="btn btn-outline-danger btn-sm mt-2 w-100 p-2"
              >
                ❤️ Add to Wishlist
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
