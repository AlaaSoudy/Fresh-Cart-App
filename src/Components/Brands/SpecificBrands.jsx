import { useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { BrandsContext } from '../../Context/BrandsContext';
import { Hourglass } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';

export default function SpecificBrands() {
  const { getSpecificBrand, getBrandProducts, brandData, brandProducts, loading } =
    useContext(BrandsContext);

  const { id } = useParams();

  useEffect(() => {
    getSpecificBrand(id);
    getBrandProducts(id);
  }, [id]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  return (
    <div className="container py-4">
      {brandData && (
        <div className="text-center mb-4">
          <img src={brandData.image} alt={brandData.name} className="rounded" width={200} />
          <h2 className="mt-3">{brandData.name}</h2>
        </div>
      )}

      <div className="row">
        <Helmet>
          <title>{brandData ? `${brandData.name} - Fresh Cart` : 'Brand - Fresh Cart'}</title>
          <meta
            name="description"
            content={`Explore products from the ${brandData ? brandData.name : 'selected brand'}.`}
          />
          <meta name="keywords" content={`brand, ${brandData ? brandData.name : 'products'}`} />
        </Helmet>

        {brandProducts.length ? (
          brandProducts.map((product) => (
            <div key={product._id} className="col-md-3 mb-4">
              <div className="border p-2 rounded text-center h-100">
                <img src={product.imageCover} className="w-100" height={200} alt={product.title} />
                <h6 className="mt-2">{product.title}</h6>
                <p className="text-muted">{product.price} EGP</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No products found for this brand.</p>
        )}
      </div>
    </div>
  );
}
