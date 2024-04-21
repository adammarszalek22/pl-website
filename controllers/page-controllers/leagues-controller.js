const path = require('path');

const { myLeagues, leagues } = require('../../pl-server-api/leagues');

module.exports.getMyLeaguesPage = async (req, res) => {

    try {

        const myAdminLeagues = await myLeagues(req.session.accessToken);

        const joinedLeagues = await leagues(req.session.accessToken);

        if (myAdminLeagues.statusCode !== 200 || joinedLeagues.statusCode !== 200) {
            // Display error on the webpage
        }

        const allLeagues = [...myAdminLeagues.leagues, ...joinedLeagues.leagues];

        for (const league of allLeagues) {
            addLeagueDiv(league);
        }

        // console.log(allLeagues)

        res.sendFile(path.join(__dirname, '..', '..', 'public', 'my-leagues.html'));
    
    } catch(error) {
        console.log(error)
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })

    }

}

const addLeagueDiv = (league) => {

    const positions = league.positions.split(' ').map(Number);

    const orderedUsers = [];

    for (const position of positions) {
        orderedUsers.push(league.user.find(user => user.id === position));
    }

    

}