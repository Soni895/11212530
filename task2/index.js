const express = require('express');
const productsRoutes = require('./routes/productsRoutes');

const app = express();

// Register products routes
app.use('/api', productsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
