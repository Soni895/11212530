const { fetchProducts } = require('../services/ecommerceService');

// Controller function to handle GET /api/companies/:companyname/categories/:categoryname/products
const getProducts = async (req, res) => {
  const { companyname, categoryname } = req.params;
  const { top, minPrice, maxPrice } = req.query;

  try {
    const products = await fetchProducts(companyname, categoryname, top, minPrice, maxPrice);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts
};
