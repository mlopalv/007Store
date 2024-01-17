const express = require('express');
const router = express.Router();
const productControllerAPI = require("../../controllers/api/productControllerAPI");

/**
 * @swagger
 * '/api/products':
 *  get:
 *     tags:
 *     - Products Controller 
 *     summary: get the list of products available in the inventory.
 *     description:  gets the list of products available in the inventory.
 *     responses:
 *       200:
 *        description: Fetched Successfully.
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
 *     summary: gets a product by product id.
 *     description: gets a product by product id.
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