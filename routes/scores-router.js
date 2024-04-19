const express = require('express');

const scoresController = require('../controllers/scores-controller');

const router = express.Router();

router
.route('/submit-scores')
.post(scoresController.submitScores)

module.exports = router;