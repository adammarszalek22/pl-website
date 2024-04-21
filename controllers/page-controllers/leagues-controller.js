const path = require('path');

module.exports.getMyLeaguesPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'my-leagues.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }

}