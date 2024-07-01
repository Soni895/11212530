const axios = require('axios');

const baseURL = 'http://20.244.56.144/test';

const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
  const url = `${baseURL}/companies/${company}/categories/${category}/products`;
  const params = {
    top: top,
    minPrice: minPrice,
    maxPrice: maxPrice
  };

  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};

module.exports = {
  fetchProducts
};
