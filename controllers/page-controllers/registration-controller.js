const path = require('path');

module.exports.getRegistrationPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', '..', 'public', 'registration.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }
}