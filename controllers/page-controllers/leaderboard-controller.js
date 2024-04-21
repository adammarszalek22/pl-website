const path = require('path');

module.exports.getLeaderboardPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'leaderboard.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }
}

