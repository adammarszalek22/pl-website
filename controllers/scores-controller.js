const { updateMultipleBetsNew } = require('../pl-server-api/bets');
const { leagues, myLeagues } = require('../pl-server-api/leagues');

module.exports.submitScores = async (req, res) => {

    const data = await updateMultipleBetsNew(req.session.accessToken, req.body);

    const data2 = await leagues(req.session.accessToken);

    const data3 = await myLeagues(req.session.accessToken)

    console.log(data2)

    console.log(data3.leagues[0].user)

    res.redirect('/main');
    
}
