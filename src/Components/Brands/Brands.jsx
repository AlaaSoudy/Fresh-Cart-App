import React, { useContext, useEffect } from 'react';
import { BrandsContext } from '../../Context/BrandsContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Brands() {
  const { getBrands, brands } = useContext(BrandsContext);
  const navigate = useNavigate();

  useEffect(() => {
    getBrands();
  }, [getBrands]);

  return (
    <>
      <Helmet>
        <title> Brands - Fresh Cart </title>
        <meta
          name="description"
          content="Explore our wide range of brands available at Fresh Cart."
        />
        <meta name="keywords" content="brands, fresh cart, grocery brands, online shopping" />
      </Helmet>

      <div className="container py-4">
        <h2 className="mb-4">🏷️ All Brands</h2>
        <div className="row">
          {brands.map((brand) => (
            <div key={brand._id} className="col-md-3 mb-4">
              <div className="card text-center p-2 h-100 shadow-sm">
                <Link to={`/brands/${brand._id}`}>
                  <img
                    src={brand.image}
                    alt={brand.name}
                    className="w-100"
                    style={{ height: '150px', objectFit: 'contain' }}
                  />
                </Link>
                <h5 className="mt-3">{brand.name}</h5>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => navigate(`/brands/${brand._id}`)}
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
