const express = require('express');
const router = express.Router();
const productControllerAPI = require("../../controllers/api/productControllerAPI");


router.get('/api/products', productControllerAPI.list);
router.get('/api/products/:id', productControllerAPI.detail);


module.exports = router;