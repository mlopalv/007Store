const express = require('express');
const router = express.Router();
const path = require('path');
const currentPath = path.resolve(__dirname,'../controllers/chevo/productController.js');
console.log("Esta es la ruta donde buscamos -> "+currentPath);
const controllersAdminProdChevo = require(currentPath);
const controllersAdminProdMau = require(path.resolve(__dirname,'../controllers/mauricio/productController'));
/** Chevo **/
/*router.get('/products', controllersAdminProdChevo.index);*/
router.get('/products/create', controllersAdminProdChevo.create);
//router.get('/products/:id', controllersAdminProdChevo.show);
//router.post('/products/create', controllersAdminProdChevo.save);
/** Mauricio **/
/*router.get('/products/:id/edit', controllersAdminProdMau.index);
router.put('/products/:id', controllersAdminProdMau.index);
router.delete('/products/:id', controllersAdminProdMau.index);*/


module.exports = router;

/*
1. /products (GET)
Listado de productos
2. /products/create (GET)
Formulario de creación de productos
3. /products/:id (GET)
Detalle de un producto particular
4. /products (POST)
Acción de creación (a donde se envía el formulario)
5. /products/:id/edit (GET)
Formulario de edición de productos
6. /products/:id (PUT)
Acción de edición (a donde se envía el formulario):
7. /products/:id (DELETE)
Acción de borrado
*/


//Requerir las rutas
//const adminProductos = require('./routes/adminProductos');
//const adminUsuarios = require('./routes/adminUsuarios');
//const adminRoutes = require('./routes/admin');

//Para usar las rutas
//app.use(adminProductos);
//app.use(adminUsuarios);
//app.use(adminRoutes);

/*
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
*/