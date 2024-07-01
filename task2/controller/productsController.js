const express = require('express');
const router = express.Router();
const { fetchProducts } = require('../services/ecommerceService');

router.get('/companies/:companyname/categories/:categoryname/products', async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  try {
    const products = await fetchProducts(companyname, categoryname, top, minPrice, maxPrice);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
