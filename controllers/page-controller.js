const fs = require('fs');

module.exports.getLoginPage = (req, res) => {

    fs.readFile(`${__dirname}/../public/login/login.html`, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the HTML content as the response
        res.send(data);
    })

}

module.exports.getRegistrationPage = (req, res) => {

    fs.readFile(`${__dirname}/../public/registration/registration.html`, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the HTML content as the response
        res.send(data);
    })

}

module.exports.getMainPage = (req, res) => {

    fs.readFile(`${__dirname}/../public/main/main-page.html`, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send the HTML content as the response
        res.send(data);
    })

}