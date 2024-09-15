const express = require('express');
const router = express.Router();
const productControllerAPI = require("../../controllers/api/productControllerAPI");

/**
 * @swagger
 * '/api/products':
 *  get:
 *     tags:
 *     - Products Controller 
 *     summary: Get the list of products available in the inventory.
 *     description:  Gets the list of products available in the inventory. If the data is succesfully obtained, the operation will return two arrays, countByCategory each array element contain the category and the quantity of products per category and data each array element contain the details of each product in the inventory {id, name, description, price, category, imagePath, detail}.
 *     responses:
 *       200:
 *        description: Fetched Successfully. The operation will return two arrays, countByCategory each array element contain the category and the quantity of products per category and data each array element contain the details of each product in the inventory {id, name, description, price, category, imagePath, detail}.
 *       400:
 *        description: Bad Request.
 *       404:
 *        description: Not Found.
 *       500:
 *        description: Server Error.
 */
router.get('/api/products', productControllerAPI.list);
 /**
 * @swagger
 * '/api/products/{id}':
 *  get:
 *     tags:
 *     - Products Controller
 *     summary: Gets a product by product id.
 *     description: Gets a product by product id.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The db identifier for product.
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request.
 *      404:
 *        description: Not Found.
 *      500:
 *        description: Server Error.
 */
router.get('/api/products/:id', productControllerAPI.detail);


module.exports = router;