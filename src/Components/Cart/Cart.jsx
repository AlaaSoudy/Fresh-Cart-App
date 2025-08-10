import { useContext } from 'react';
import { cartContext } from '../../Context/Cart';
import { RotatingLines } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function Cart() {
  const {
    cartProducts,
    clearDataFromCart,
    totalCartPrice,
    numOfCartItems,
    removeProductFromCart,
    updateProductQuantity,
    getUserCart,
  } = useContext(cartContext);

  async function removeElements() {
    try {
      const res = await clearDataFromCart();
      if (res.status === 'success') {
        toast.success('Cart cleared successfully');
      } else {
        toast.error('Error occurred while clearing cart');
      }
    } catch (error) {
      toast.error('Error occurred while clearing cart');
      console.error(error);
    }
  }

  async function updateElementCount(id, count) {
    try {
      const res = await updateProductQuantity(id, count);
      if (res) {
        toast.success('Product quantity updated');
        await getUserCart();
      } else {
        toast.error('Error occurred');
      }
    } catch (error) {
      toast.error('Error occurred while updating product quantity');
      console.error(error);
    }
  }

  async function deleteElement(productId) {
    try {
      const res = await removeProductFromCart(productId);
      if (res?.status === 'success') {
        toast.success('Product removed from cart');
        await getUserCart();
      } else {
        toast.error('Error occurred');
      }
    } catch (error) {
      toast.error('Error occurred while removing product');
      console.error(error);
    }
  }

  return (
    <>
      <Helmet>
        <title> Cart - Fresh Cart </title>
        <meta name="description" content="View and manage your shopping cart items." />
        <meta name="keywords" content="cart, shopping cart, ecommerce, fresh cart" />
      </Helmet>

      <div className="container py-5 mb-3">
        <h2>Shop Cart</h2>
        <h5>Total cart Price: {totalCartPrice} EGP</h5>
        <h6>Total items: {numOfCartItems}</h6>

        {cartProducts == null ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '200px' }}
          >
            <RotatingLines
              visible={true}
              height="96"
              width="96"
              color="grey"
              strokeWidth="5"
              animationDuration="0.75"
              ariaLabel="rotating-lines-loading"
            />
          </div>
        ) : Array.isArray(cartProducts) && cartProducts.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          Array.isArray(cartProducts) &&
          cartProducts.map((product, idx) => (
            <div className="row my-2 bg-cart border-bottom border-3 p-2" key={product?._id || idx}>
              <div className="col-sm-1">
                <img
                  className="w-100"
                  src={product?.product?.imageCover || ''}
                  alt={product?.product?.title || 'Product Image'}
                />
              </div>
              <div className="col-sm-9">
                <div>
                  <h5 className="mx-2">{product?.product?.title || 'Title'}</h5>
                  <h5 className="mx-2">Product Price : {product?.price ?? 'N/A'} EGP</h5>
                  <button
                    onClick={() => deleteElement(product.product._id)}
                    className="btn btn-outline-danger"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="d-flex justify-content-center align-items-center">
                  <button
                    onClick={() =>
                      updateElementCount(product.product._id, (product?.count ?? 0) + 1)
                    }
                    className="btn btn-outline-success"
                  >
                    +
                  </button>

                  <span className="align-items-center mx-2">{product.count ?? 0}</span>

                  <button
                    onClick={() =>
                      updateElementCount(product.product._id, (product?.count ?? 0) - 1)
                    }
                    className="btn btn-outline-success"
                    disabled={product.count <= 1}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          ))
        )}

        <div className="d-flex justify-content-between">
          <button className="btn btn-outline-danger" onClick={() => removeElements()}>
            Clear
          </button>
          <Link className="btn btn-outline-primary me-2 fs-6" to="/Payment">
            Confirm payment
          </Link>
        </div>
      </div>
    </>
  );
}
