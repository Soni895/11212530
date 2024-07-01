const express = require("express");
const router = express.Router();
const{getNumbers}= require("../controller/getNumbers");

router.get('/numbers/:numberid', getNumbers);
module.exports = router;

