const express = require('express');

const loginPageController = require('../controllers/page-controllers/login-controller');
const registrationPageController = require('../controllers/page-controllers/registration-controller');
const mainPageController = require('../controllers/page-controllers/main-page-controller');
const leaguesPageController = require('../controllers/page-controllers/leagues-controller');
const leaderboardPageController = require('../controllers/page-controllers/leaderboard-controller');
const userPageController = require('../controllers/page-controllers/user-page-controller');

const router = express.Router();

router
.route('/login')
.get(loginPageController.getLoginPage);

router
.route('/registration')
.get(registrationPageController.getRegistrationPage);

router
.route('/main')
.get(mainPageController.getMainPage);

router
.route('/my-leagues')
.get(leaguesPageController.getMyLeaguesPage);

router
.route('/leaderboard')
.get(leaderboardPageController.getLeaderboardPage);

router
.route('/user')
.get(userPageController.getMainPage);

module.exports = router;