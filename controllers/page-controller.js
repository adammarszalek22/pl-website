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

    // Getting the current gameweek
    const currentGameweek = footballData.getCurrentGameweek();

    // Getting all of user's predictions
    const userPredictions = await getAllBetsByUserId(req.session.accessToken);

    let predictionsCard = '';

    for (let i = 1; i < currentGameweek; i++) {
        // For now only interested in the current gameweek predictions
        const gameweekPredictions = userPredictions.filter(bet => bet.gameweek == i);
        // Sorting them by kickoff time (for correct display)
        gameweekPredictions.sort((betA, betB) => footballData.getKickOffTime(betA.match_id) - footballData.getKickOffTime(betB.match_id));
        
        // Creating the HTML element that holds all games/scores/predictions of the given gameweek
        predictionsCard += await createPredictionsCard(gameweekPredictions);
    }


    // For now only interested in the current gameweek predictions
    const gameweekPredictions = userPredictions.filter(bet => bet.gameweek == currentGameweek);
    // Sorting them by kickoff time (for correct display)
    gameweekPredictions.sort((betA, betB) => footballData.getKickOffTime(betA.match_id) - footballData.getKickOffTime(betB.match_id));
    
    // Creating the HTML element that holds all games/scores/predictions of the given gameweek
    predictionsCard += await createPredictionsCard(gameweekPredictions, { current: true });

    for (let i = currentGameweek + 1; i < 38; i++) {
        // For now only interested in the current gameweek predictions
        const gameweekPredictions = userPredictions.filter(bet => bet.gameweek == i);
        // Sorting them by kickoff time (for correct display)
        gameweekPredictions.sort((betA, betB) => footballData.getKickOffTime(betA.match_id) - footballData.getKickOffTime(betB.match_id));
        
        // Creating the HTML element that holds all games/scores/predictions of the given gameweek
        predictionsCard += await createPredictionsCard(gameweekPredictions);
    }





    // Getting raw HTML from the public folder
    const rawHtml = await fs.promises.readFile(`${__dirname}/../public/main-page.html`, 'utf-8')

    // Amending the HTML
    const completeHtml = rawHtml.replace('%PREDICTIONS%', predictionsCard);
    
    // Sending the complete HTML to the client
    res.send(completeHtml);

}

const createPredictionsCard = async (gameweekPredictions, opts = {}) => {

    let predictionsCard = `<div class="carousel-item${opts.current||true ? ' show' : ' hide'}">`;

    for (const bet of gameweekPredictions) {

        const fixture = footballData.getFixtureData(bet.match_id);

        predictionsCard += await addMatchDiv(bet, fixture);
    }

    predictionsCard += '</div>';

    return predictionsCard;

}

const addMatchDiv = async (bet, fixture) => {
    return `
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