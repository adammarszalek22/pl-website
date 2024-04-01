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

router
.route('/my-account')
.get(pageController.getMyAccountPage);

router
.route('/my-leagues')
.get(pageController.getMyLeaguesPage);

router
.route('/leaderboard')
.get(pageController.getLeaderboardPage);

module.exports = router;