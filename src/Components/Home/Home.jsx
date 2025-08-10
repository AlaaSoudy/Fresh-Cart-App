import React from 'react';
import Categories from '../Categories/Categories';
import { Link } from 'react-router-dom';
import HomeSlider from './HomeSlider';
import { Helmet } from 'react-helmet';
import CategorySlider from '../Categories/CategoriesSlider';

export default function Home() {
  return (
    <>
      <Helmet>
        <title> Home - Fresh Cart </title>
        <meta
          name="description"
          content="Welcome to Fresh Cart, your one-stop shop for all your grocery needs. Explore our wide range of products and enjoy fresh, quality items delivered to your doorstep."
        />
        <meta name="keywords" content="grocery, fresh food, online shopping, delivery" />
      </Helmet>

      <div className="container py-4">
        <div className="mb-5">
          <HomeSlider />
        </div>

        <div className=" bg-light rounded-3 p-4 shadow-sm mb-5" data-aos="fade-up">
          {/* <h3 className="fw-bold mb-3">
          <i className="fa-solid fa-layer-group text-success me-2"></i>Shop by Category
    </Helmet>

    <div className="container py-4">
      <div className="mb-5">
        <HomeSlider />
      </div>

      <div className=" bg-light rounded-3 p-4 shadow-sm mb-5" data-aos="fade-up">
        {/* <h3 className="fw-bold mb-3">
          <i className="fa-solid fa-layer-group text-success me-2"></i>Shop by Category
        </h3> */}
          <CategorySlider />
        </div>

        <div className="row gx-3 mb-5 ">
          <div className="col-md-6 mb-3 mb-md-0" data-aos="fade-right">
            <img
              src={require('../../images/grocery-banner-2.jpeg')}
              className="w-100 rounded-3 shadow"
              style={{ height: '250px', objectFit: 'cover' }}
              alt="Banner 1"
            />
          </div>
          <div className="col-md-6 mb-3" data-aos="fade-left">
            <img
              src={require('../../images/grocery-banner.png')}
              className="w-100 rounded-3 shadow"
              style={{ height: '250px', objectFit: 'cover' }}
              alt="Banner 2"
            />
          </div>
        </div>

        <div className="text-center my-2  " data-aos="zoom-in">
          <h4 className="mb-3"> Check out our top-selling products!</h4>
          <Link to="/Products" className="btn btn-success px-4 py-2 shadow-sm">
            View All Products
          </Link>
        </div>
      </div>
    </>
  );
}
