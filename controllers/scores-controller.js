const { updateMultipleBetsNew } = require('../pl-server-api/bets');

module.exports.submitScores = async (req, res) => {

    // Get response from pl server
    console.log(req.body)

    const data = await updateMultipleBetsNew(req.session.accessToken, req.body);

    console.log(data);

    // res.redirect('/main');
    
}
