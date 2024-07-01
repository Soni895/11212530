const express = require("express");
const router = express.Router();
const {cal, GetAllLogs}= require("../controller/calculation");



router.post("/",cal);


module.exports = router;

