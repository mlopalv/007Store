const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('../views/index');
});

router.get('/carrito', (req, res) => {
    res.render('productCart');
});

router.get('/registro', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;