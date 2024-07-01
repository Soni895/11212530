const express = require("express");
require("dotenv").config();
const Routes=require("./routes/productsRoutes");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: "*",
    })
);
// Middleware for post calls 
app.use(express.json());

//Routes 
app.use("/api/v1", Routes);

// Listening to ports
app.listen(PORT, () => {
    console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});
//For checking the port
app.get("*", (req, res) => {
    res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
});
