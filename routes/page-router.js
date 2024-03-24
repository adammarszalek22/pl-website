const express = require('express');

const pageController = require('../controllers/page-controller');

const router = express.Router();

router
.route('/login')
.get(pageController.getLoginPage);

router
.route('/registration')
.get(pageController.getRegistrationPage);

router
.route('/main')
.get(pageController.getMainPage);

module.exports = router;