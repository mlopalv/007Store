const express = require('express');
const router = express.Router();
const usersControllerAPI = require("../../controllers/api/usersControllerAPI");


router.get('/api/users', usersControllerAPI.list);
router.get('/api/users/:id', usersControllerAPI.detail);


module.exports = router;