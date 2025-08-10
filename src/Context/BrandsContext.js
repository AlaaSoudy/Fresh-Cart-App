import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BrandsContext = createContext();

export default function BrandsContextProvider({ children }) {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [brandData, setBrandData] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);

  async function getBrands() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
      setBrands(data.data);
    } catch (error) {
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getSpecificBrand(brandId) {
    setLoading(true);
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
      setBrandData(data.data);
    } catch (error) {
      console.error('Error fetching specific brand:', error);
    } finally {
      setLoading(false);
    }
  }

  async function getBrandProducts(brandId) {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
      );
      setBrandProducts(data.data);
    } catch (error) {
      console.error('Error fetching brand products:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <BrandsContext.Provider
      value={{
        getBrands,
        getSpecificBrand,
        getBrandProducts,
        brandData,
        brandProducts,
        brands,
        loading,
      }}
    >
      {children}
    </BrandsContext.Provider>
  );
}
