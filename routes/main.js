const express = require('express');
const router = express.Router();


/*router.get('/', (req, res) => {
    res.render('../views/index');
});*/

router.get('/carrito', (req, res) => {
    res.render('../views/productCart');
});

router.get('/registro', (req, res) => {
    res.render('../views/register');
});

router.get('/login', (req, res) => {
    res.render('../views/login');
});

router.get('/product', (req, res) => {
    res.render('../views/productDetails');
});

/*
router.get('/productCreate', (req, res) => {
    res.render('../views/productCreate');
});

router.get('/productEdit', (req, res) => {
    res.render('../views/productEdit');
});
*/

module.exports = router;