import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';

export default function SpecificCategory() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getCategoryDetails() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${id}`
      );
      setProducts(data.data);
    } catch (error) {
      console.error('Error fetching category products:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getCategoryInfo() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
      setCategory(data.data);
    } catch (error) {
      console.error('Error fetching category info:', error);
    }
  }

  useEffect(() => {
    getCategoryDetails();
    getCategoryInfo();
  }, [id]);

  if (loading)
    return (
      <p className="text-center my-5">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </p>
    );

  return (
    <div className="container py-4">
      {category && (
        <div className="text-center mb-4">
          <img src={category.image} alt={category.name} className="rounded" width={200} />
          <h2 className="mt-3">{category.name}</h2>
        </div>
      )}

      <div className="row">
        <Helmet>
          <title>{category ? `${category.name} - Fresh Cart` : 'Category - Fresh Cart'}</title>
          <meta
            name="description"
            content={`Explore products in the ${category ? category.name : 'selected category'}.`}
          />
          <meta
            name="keywords"
            content={`category, ${category ? category.name : 'products    '}`}
          />
        </Helmet>

        {products.length ? (
          products.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="border p-2 rounded text-center h-100">
                <img src={product.imageCover} className="w-100" height={200} alt={product.title} />
                <h6 className="mt-2">{product.title}</h6>
                <p className="text-muted">{product.price} EGP</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
