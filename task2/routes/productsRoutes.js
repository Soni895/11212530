const express = require('express');
const router = express.Router();
const {getProducts}= require("../controller/productsController");
// Define the route with the correct controller function
router.get('/companies/:companyname/categories/:categoryname/products', getProducts);

module.exports = router;
