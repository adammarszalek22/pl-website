const path = require('path');
const fs = require('fs')

const { getAllBetsByUserId } = require('../pl-server-api/bets');
const { footballData } = require('../fantasy-api.js');

module.exports.getLoginPage = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));

}

module.exports.getRegistrationPage = (req, res) => {

    res.sendFile(path.join(__dirname, '..', 'public', 'registration.html'));

}

module.exports.getMainPage = async (req, res) => {

    const currentGameweek = footballData.getCurrentGameweek();

    const userPredictions = await getAllBetsByUserId(req.session.accessToken);

    const gameweekPredictions = userPredictions.filter(bet => bet.gameweek == currentGameweek);
    
    let matchHtml = '';

    for (const bet of gameweekPredictions) {
        console.error(footballData.getFixtureData(bet.match_id))
        const { team_a_image_id: teamANumber, team_h_image_id: teamHNumber, team_a_name: teamAName, team_h_name: teamHName } = footballData.getFixtureData(bet.match_id);

        matchHtml += `
        <div class="match-div">
            <div class="vertical-center">
                <div class="team home image">
                    <img src="./images/teams/${teamHNumber}.png" alt="Example Image" class="team-image home">
                </div>
            </div>
            <div class="vertical-center"><div class="team home name">${teamHName}</div></div>
            <div class="vertical-center"><div class="score home">${bet.goal1}</div></div>
            <div class="vertical-center"><div class="score away">${bet.goal2}</div></div>
            <div class="vertical-center"><div class="team away name">${teamAName}</div></div>
            <div class="vertical-center">
                <div class="team home image">
                    <img src="./images/teams/${teamANumber}.png" alt="Example Image" class="team-image away">
                </div>
            </div>
        </div>
        `;
    }


    const rawHtml = await fs.promises.readFile(`${__dirname}/../public/main-page.html`, 'utf-8')

    const htmlWithData = rawHtml.replace('%PREDICTIONS%', matchHtml);
    
    res.send(htmlWithData);

}