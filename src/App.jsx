import React from 'react';

import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Cart from './Components/Cart/Cart';
import Profile from './Components/Profile/Profile';
import { AuthProvider } from './Context/authentication';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProtectRouter from './Context/ProtectRouter';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import Home from './Components/Home/Home';
import { CartContextProvider } from './Context/Cart';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import { CategoryContextProvider } from './Context/CategoryContext';
import SpecificCategory from './Components/Categories/SpecificCategory';
import BrandsContextProvider from './Context/BrandsContext';
import SpecificBrands from './Components/Brands/SpecificBrands';
import AllOrders from './Components/AllOrders/AllOrders';
import WishlistContextProvider from './Context/WishlistContext ';
import Wishlist from './Components/Wishlist/Wishlist';
import { Offline } from 'react-detect-offline';
import ResetPassword from './Components/ResetPassword/ResetPassword';

const clientQuery = new QueryClient();

const myRouter = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },

      {
        path: 'home',
        element: (
          <>
            <div className="container mb-5">
              <Home />
            </div>
          </>
        ),
      },

      {
        path: 'Products',
        element: (
          <ProtectRouter>
            <Products />
          </ProtectRouter>
        ),
      },

      {
        path: 'AllOrders',
        element: (
          <ProtectRouter>
            <AllOrders />
          </ProtectRouter>
        ),
      },

      {
        path: 'cart',
        element: (
          <ProtectRouter>
            <Cart />
          </ProtectRouter>
        ),
      },
      {
        path: 'profile',
        element: (
          <ProtectRouter>
            <Profile />
          </ProtectRouter>
        ),
      },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      { path: '/reset-password', element: <ResetPassword /> },
      {
        path: 'Brands',
        element: (
          <ProtectRouter>
            <Brands />
          </ProtectRouter>
        ),
      },
      {
        path: 'Categories',
        element: (
          <ProtectRouter>
            <Categories />
          </ProtectRouter>
        ),
      },

      {
        path: 'category/:id',
        element: (
          <ProtectRouter>
            <SpecificCategory />
          </ProtectRouter>
        ),
      },

      {
        path: '/wishlist',
        element: (
          <ProtectRouter>
            <Wishlist />
          </ProtectRouter>
        ),
      },

      {
        path: 'ProductDetails/:id',
        element: (
          <ProtectRouter>
            <ProductDetails />
          </ProtectRouter>
        ),
      },

      {
        path: 'Payment',
        element: (
          <ProtectRouter>
            <Payment />
          </ProtectRouter>
        ),
      },

      {
        path: 'brands/:id',
        element: (
          <ProtectRouter>
            <SpecificBrands />
          </ProtectRouter>
        ),
      },

      { path: '*', element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <QueryClientProvider client={clientQuery}>
        <CartContextProvider>
          <AuthProvider>
            <WishlistContextProvider>
              <BrandsContextProvider>
                <CategoryContextProvider>
                  <RouterProvider router={myRouter} />
                </CategoryContextProvider>
              </BrandsContextProvider>
            </WishlistContextProvider>
          </AuthProvider>
        </CartContextProvider>
      </QueryClientProvider>

      <Toaster position="top-center" reverseOrder={false} />

      <Offline>
        <div
          className="position-fixed top-0 start-50 translate-middle-x w-100 text-center p-3 bg-danger text-white"
          style={{ zIndex: 1050 }}
        >
          <h3>⚠️ You are offline!</h3>
          <p>Please check your internet connection and try again.</p>
        </div>
      </Offline>
    </>
  );
}
