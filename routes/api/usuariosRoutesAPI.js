const express = require('express');
const router = express.Router();
const usersControllerAPI = require("../../controllers/api/usersControllerAPI");

/**
 * @swagger
 * '/api/users':
 *  get:
 *     tags:
 *     - User Controller 
 *     summary: get the list of existent users in the application.
 *     description:  gets the list of existent users in the application.
 *     responses:
 *      200:
 *        description: Fetched Successfully
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 *      500:
 *        description: Server Error 
 */
router.get('/api/users', usersControllerAPI.list);
/**
 * @swagger
 * '/api/users/{id}':
 *  get:
 *     tags:
 *     - User Controller
 *     summary: gets a user by user id.
 *     description:  gets a user by user id.
 *     parameters:
 *      - name: id
 *        in: path
 *        description: The db identifier for the user.
 *        required: true
 *     responses:
 *      200:
 *        description: Fetched Successfully.
 *      400:
 *        description: Bad Request.
 *      404:
 *        description: Not Found.
 *      500:
 *        description: Server Error.
 */
router.get('/api/users/:id', usersControllerAPI.detail);


module.exports = router;