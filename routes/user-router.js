const express = require('express');

const userController = require('../controllers/user-controller');

const router = express.Router();

router
.route('/validate-login-details')
.post()

module.exports = router;