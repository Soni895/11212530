const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// Route for fetching products
router.get('/companies/:companyname/categories/:categoryname/products', productsController.getProducts);

module.exports = router;
