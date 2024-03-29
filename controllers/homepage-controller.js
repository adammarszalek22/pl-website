const { getAllBetsByUserId } = require('../pl-server-api/bets');

module.exports.initializeHomepage = async (req, res) => {

    // const currentGameweek = 

    const userPredictions = await getAllBetsByUserId(req.session.accessToken);

    console.error(userPredictions)

}