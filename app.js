const express = require("express");
const app = express();

const path = require("path");

const publicPath = path.resolve(__dirname, "./public");

app.use(express.static(publicPath));

app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/product', (req, res) => {
    res.render('productDetails');
});

app.get('/productCreate', (req, res) => {
    res.render('productCreate');
});

app.get('/productEdit', (req, res) => {
    res.render('productEdit');
});

app.get('/carrito', (req, res) => {
    res.render('productCart');
});

app.get('/registro', (req, res) => {
    res.render('register');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000");
    console.log("Folder Path = " + publicPath);
});