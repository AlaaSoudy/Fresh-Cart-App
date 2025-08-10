import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ProgressBar, ThreeDots } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { cartContext } from '../../Context/Cart';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function ProductDetails() {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const [sendingLoader, setIsLoading] = useState(false);

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function addProduct(product) {
    try {
      setIsLoading(true);
      const res = await addProductToCart(product.id);

      if (res && res.message) {
        toast.success(res.message);
      } else {
        toast.error('Failed to add product to cart');
      }
      console.log(res);
    } catch (err) {
      toast.error('An error occurred');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  const { data, isLoading, isError } = useQuery(['productDetails', id], getProductDetails);

  if (isLoading) {
    return (
      <div className="vh-100 d-flex justify-content-center align-items-center">
        <ProgressBar
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
        />
      </div>
    );
  }

  if (isError || !data?.data?.data) {
    return <div className="text-center mt-5 text-danger">Product not found</div>;
  }

  const product = data.data.data;

  return (
    <div className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-4">
          <img src={product.imageCover} alt={product.title} className="w-100 rounded-3" />
        </div>

        <div className="col-md-8">
          <h1 className="mb-3">{product.title}</h1>
          <p className="text-muted">{product.description}</p>

          <Helmet>
            <title>{product.title.split(' ').slice(0, 2).join(' ')} - Fresh Cart</title>
          </Helmet>

          <h3>{product.title}</h3>
          <p className="text-muted">{product.description}</p>
          <h5 className="text-success">{product.price} EGP</h5>
          <p>
            Category: <strong>{product.category?.name}</strong>
          </p>
          <p>
            Rating: <i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}
          </p>

          <button
            disabled={sendingLoader}
            onClick={() => addProduct(product)}
            className="btn btn-success mt-3 d-flex justify-content-center align-items-center"
            style={{ height: '50px', width: '160px' }}
          >
            {sendingLoader ? (
              <ThreeDots
                visible={true}
                height="40"
                width="40"
                color="#fff"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            ) : (
              'Add to Cart'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
