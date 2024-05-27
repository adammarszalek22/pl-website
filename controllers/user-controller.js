const { login, createUser } = require('../pl-server-api/user');
const { v4: uuidv4 } = require('uuid');

module.exports.login = async (req, res) => {

    // Get response from pl server
    const response = await login(req.body);

    req.session.sessionId = uuidv4();
    req.session.accessToken = response.access_token;
    req.session.refreshToken = response.refresh_token;
    req.session.userId = response.user_id;
    req.session.username = response.username;

    res.redirect('/main');
    
}

module.exports.register = async (req, res) => {

    // Get response from pl server
    const response = await createUser(req.body);

    console.log(response)

    req.session.sessionId = uuidv4();
    req.session.accessToken = response.access_token;
    req.session.refreshToken = response.refresh_token;
    req.session.userId = response.user_id;

    res.redirect('/main');
    
}