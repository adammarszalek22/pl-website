const { login } = require('../pl-server-api/user');

module.exports.login = async (req, res) => {

    // Get response from pl server
    const response = await login(req.body);
    
    res
    .status(200)
    .json({
        status: 'Success',
        data: response
    })
    
}