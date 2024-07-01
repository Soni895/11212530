const express = require('express');
const router = express.Router();
const { getProducts } = require('../controller/productsController');

// Route for fetching products
router.get('/companies/:companyname/categories/:categoryname/products', getProducts);

module.exports = router;
