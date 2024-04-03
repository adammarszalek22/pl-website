const path = require('path');
const fs = require('fs')

const { getAllBetsByUserId } = require('../pl-server-api/bets');
const { footballData } = require('../fantasy-api.js');

module.exports.getLoginPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }

}

module.exports.getRegistrationPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'registration.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }
}

module.exports.getMainPage = async (req, res) => {

    try {

        // Getting the current gameweek
        const currentGameweek = footballData.getCurrentGameweek();

        // Getting all of user's predictions
        const userPredictions = await getAllBetsByUserId(req.session.accessToken);

        let predictionsCard = '';

        // For each gamewweek in the season
        for (let i = 1; i <= 38; i++) {

            // Getting the matches from that gameweek
            const gameweekMatchIds = footballData.getGameweekMatches(i);
            
            // Creating the HTML element that holds all games/scores/predictions of the given gameweek
            predictionsCard += await createPredictionsCard(gameweekMatchIds, userPredictions, { current: currentGameweek === i });

        }

        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(`${__dirname}/../public/main-page.html`, 'utf-8');

        // Amending the HTML
        const completeHtml = rawHtml.replace('%PREDICTIONS%', predictionsCard);

        // Sending the complete HTML to the client
        res.send(completeHtml);

    } catch(error) {
        console.error(error)
        res
        .status(500)
        .json({
            message: 'Unexpected error'
        })
    }

}

module.exports.getMyAccountPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'my-account.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }

}

module.exports.getMyLeaguesPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'my-leagues.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }

}

module.exports.getLeaderboardPage = (req, res) => {

    try {
        res.sendFile(path.join(__dirname, '..', 'public', 'leaderboard.html'));
    } catch(error) {
        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })
    }
}

const createPredictionsCard = async (gameweekMatchIds, userPredictions, opts = {}) => {

    // Creating a carousel item for the given gameweek
    let predictionsCard = `<div class="carousel-item${opts.current ? ' current' : ' hide'}">`;

    // For each match
    for (const fixture of gameweekMatchIds) {
        
        // If the user has previously submitted their predictions, we display them
        const bet = userPredictions.find(bet => bet.match_id === fixture.code);

        // Add the current fixture to the div
        predictionsCard += await addMatchDiv(bet, fixture);

    }

    predictionsCard += '</div>';
    
    return predictionsCard;

}

const addMatchDiv = async (bet, fixture) => {
    return `
    <div class="match-div">
    
        <div class="vertical-center">
            <div class="team-image home">
                <img src="./images/teams/${fixture.team_h_code}.png" alt="Example Image" class="team-image home">
            </div>
        </div>

        <div class="vertical-center">
            <div class="team home name">${fixture.team_h_name}</div>
        </div>
        <div class="vertical-center">
            <div class="score home">${fixture.started ? Number(fixture.team_h_score) : ''}</div>
        </div>
        <div class="vertical-center">
            <div class="score home input"><input class="score-prediction" value="${bet?.goal1 ?? ''}"></div>
        </div>
        <div class="vertical-center">
            <div class="score away input"><input class="score-prediction" value="${bet?.goal2 ?? ''}"></div>
        </div>
        <div class="vertical-center">
            <div class="score away">${fixture.started ? Number(fixture.team_a_score) : ''}</div>
        </div>
        <div class="vertical-center">
            <div class="team away name">${fixture.team_a_name}</div>
        </div>

        <div class="vertical-center">
            <div class="team-image away">
                <img src="./images/teams/${fixture.team_a_code}.png" alt="Example Image" class="team-image away">
            </div>
        </div>

    </div>
    `;
}