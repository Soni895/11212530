const axios = require('axios');
const { param } = require('../routes/productsRoutes');

const baseURL = 'http://20.244.56.144/test';
const bearerToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE5ODIwNDIxLCJpYXQiOjE3MTk4MjAxMjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjRlZTlmNTBmLTVlZWQtNDM0MS1hYTdhLTBhY2NmODg4NjY5YiIsInN1YiI6InZhbnNobmFyYW5nNDk5MDZAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiZ29NYXJ0IiwiY2xpZW50SUQiOiI0ZWU5ZjUwZi01ZWVkLTQzNDEtYWE3YS0wYWNjZjg4ODY2OWIiLCJjbGllbnRTZWNyZXQiOiJTQXJRYUtVRGpIdExKTFlhIiwib3duZXJOYW1lIjoidmFuc2giLCJvd25lckVtYWlsIjoidmFuc2huYXJhbmc0OTkwNkBnbWFpbC5jb20iLCJyb2xsTm8iOiIxMTIxMjUyMCJ9.GS_WCOcQkYazmYBCrng-AhpEVYZtEKayPg_kd5JQa60';
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