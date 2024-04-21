const path = require('path');

module.exports.getLoginPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'login.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }

}