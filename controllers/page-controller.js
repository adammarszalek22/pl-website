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
    gameweekPredictions.sort((betA, betB) => footballData.getKickOffTime(betA.match_id) - footballData.getKickOffTime(betB.match_id));
    
    let matchHtml = '';
    for (const bet of gameweekPredictions) {

        const fixture = footballData.getFixtureData(bet.match_id);
        
        matchHtml += `
        <div class="match-div">

            <div class="vertical-center">
                <div class="team home image">
                    <img src="./images/teams/${fixture.team_h_image_id}.png" alt="Example Image" class="team-image home">
                </div>
            </div>

            <div class="vertical-center">
                <div class="team home name">${fixture.team_h_name}</div>
            </div>
            <div class="vertical-center">
                <div class="score home">${fixture.team_h_score || ''}</div>
            </div>
            <div class="vertical-center">
                <div class="score home input"><input class="score-prediction" value="${bet.goal1}"></div>
            </div>
            <div class="vertical-center">
                <div class="score away input"><input class="score-prediction" value="${bet.goal2}"></div>
            </div>
            <div class="vertical-center">
                <div class="score away">${fixture.team_a_score || ''}</div>
            </div>
            <div class="vertical-center">
                <div class="team away name">${fixture.team_a_name}</div>
            </div>

            <div class="vertical-center">
                <div class="team home image">
                    <img src="./images/teams/${fixture.team_a_image_id}.png" alt="Example Image" class="team-image away">
                </div>
            </div>

        </div>
        `;
    }


    const rawHtml = await fs.promises.readFile(`${__dirname}/../public/main-page.html`, 'utf-8')

    const completeHtml = rawHtml.replace('%PREDICTIONS%', matchHtml);
    
    res.send(completeHtml);

}