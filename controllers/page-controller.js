const path = require('path');

module.exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', 'login', 'login.html'));

}

module.exports.getRegistrationPage = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', 'registration', 'registration.html'));

}

module.exports.getMainPage = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', 'main', 'main-page.html'));

}