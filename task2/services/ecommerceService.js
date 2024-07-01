const axios = require('axios');
const { param } = require('../routes/productsRoutes');

const baseURL = 'http://20.244.56.144/test';
const bearerToken = 'eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE5ODI0MDIwLCJpYXQiOjE3MTk4MjM3MjAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6Ijk1ZWY2NGZjLWY1OTctNDVmZC04Mzg2LTU1ZTc4MDQyOTZjNCIsInN1YiI6IkRhcnNoYW5zb25pODk1QGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiOTVlZjY0ZmMtZjU5Ny00NWZkLTgzODYtNTVlNzgwNDI5NmM0IiwiY2xpZW50U2VjcmV0IjoibGVHWXRQd2dQYVhzbW5WeSIsIm93bmVyTmFtZSI6IkRhcnNoYW4iLCJvd25lckVtYWlsIjoiRGFyc2hhbnNvbmk4OTVAZ21haWwuY29tIiwicm9sbE5vIjoiMTEyMTI1MzAifQ.HMvsO2mpm5J7CbyaAA-cnUGWhqNH7975r6tZdWUtjXE';
const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
    const url = `${baseURL}/companies/${company}/categories/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    // const params = {
    //     top: top,
    //     minPrice: minPrice,
    //     maxPrice: maxPrice
    // };
    // console.log(params)
    console.log(url)

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${bearerToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.message);
        throw error;
    }
};

module.exports = {
    fetchProducts
};