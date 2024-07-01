const express = require('express');
const router = express.Router();
const { fetchProducts } = require('../services/ecommerceService');

const getProducts = async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;
  // console.log(categoryname)
  try {
    const products = await fetchProducts(companyname, categoryname, top, minPrice, maxPrice);
    console.log(products)
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

router.get('/companies/:companyname/categories/:categoryname/products', getProducts);

module.exports = {
  router,
  getProducts
};
