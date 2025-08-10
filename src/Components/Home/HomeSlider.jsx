import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            style={{ width: '100%', height: '400px' }}
            src={require('../../images/slider-image-1.jpeg')}
            alt=""
            className="w-100"
          />
        </div>
        <div>
          <img
            style={{ width: '100%', height: '400px' }}
            src={require('../../images/slider-2.jpeg')}
            alt=""
            className="w-100 "
          />
        </div>
        <div>
          <img
            style={{ width: '100%', height: '400px' }}
            src={require('../../images/slider-image-2.jpeg')}
            alt=""
            className="w-100"
          />
        </div>
        <div>
          <img
            style={{ width: '100%', height: '400px' }}
            src={require('../../images/slider-image-3.jpeg')}
            alt=""
            className="w-100"
          />
        </div>
      </Slider>
    </>
  );
}
