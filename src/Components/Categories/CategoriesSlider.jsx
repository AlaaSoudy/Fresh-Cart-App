import React, { useContext } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CategoryContext } from '../../Context/CategoryContext';

export default function CategorySlider() {
  const { categories, setSelectedCategory } = useContext(CategoryContext);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  function goToCategory(category) {
    setSelectedCategory(category);
    navigate(`/category/${category._id}`);
  }

  return (
    <div className="container my-5">
      <h2 className="mb-4">Shop by Category</h2>
      <Slider {...settings}>
        {categories.map((category) => (
          <div
            key={category._id}
            className="text-center category-item"
            style={{ cursor: 'pointer', padding: '10px' }}
            onClick={() => goToCategory(category)}
          >
            <img
              src={category.image}
              alt={category.name}
              style={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 8 }}
            />
            <h6 className="mt-2">{category.name}</h6>
          </div>
        ))}
      </Slider>
    </div>
  );
}
