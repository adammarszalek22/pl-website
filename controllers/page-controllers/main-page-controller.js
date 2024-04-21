const fs = require('fs');

const { footballData } = require('../../fantasy-api.js');
const { myUserInfo } = require('../../pl-server-api/user');
const { getAllBetsByUserId } = require('../../pl-server-api/bets');

module.exports.getMainPage = async (req, res) => {

    try {

        // Getting the current gameweek
        const currentGameweek = footballData.getCurrentGameweek();

        // Getting user's main details
        const userDetails = await myUserInfo(req.session.accessToken, req.session.userId)

        // Getting all of user's predictions
        const userPredictions = await getAllBetsByUserId(req.session.accessToken);

        let predictionsCard = '';

        // For each gamewweek in the season
        for (let gameweek = 1; gameweek <= 38; gameweek++) {

            // Getting the matches from that gameweek
            const gameweekMatchIds = footballData.getGameweekMatches(gameweek);
            
            // Creating the HTML element that holds all games/scores/predictions of the given gameweek
            const opts = { current: currentGameweek === gameweek, hasGameweekStarted: footballData.hasGameweekStarted(gameweek) }
            predictionsCard += await createPredictionsCard(gameweekMatchIds, userPredictions, gameweek, opts);

        }

        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(`${__dirname}/../../public/main-page.html`, 'utf-8');

        // Amending the HTML
        const completeHtml = rawHtml
        .replace('%USERNAME%', userDetails.username)
        .replace('%POINTS%', userDetails.points)
        .replace('%GLOBAL_RANK%', userDetails.position)
        .replace('%ONE_POINTERS%', userDetails.one_pointers)
        .replace('%THREE_POINTERS%', userDetails.three_pointers)
        .replace('%PREDICTIONS%', predictionsCard)
        .replace('%GAMEWEEK%', `Gameweek ${currentGameweek}`);

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

const createPredictionsCard = async (gameweekMatchIds, userPredictions, gameweek, opts = {}) => {

    // Creating a carousel item for the given gameweek
    let predictionsCard = `
    <div class="carousel-item${opts.current ? ' current' : ' hide'}" id="${gameweek}">
        <form id="gameweek-scores-form-${gameweek}" class="submit-scores-form" action="/api/pl/submit-scores" method="POST">
    `;
    
    // For each match
    for (const fixture of gameweekMatchIds) {

        // If the user has previously submitted their predictions, we display them
        const bet = userPredictions.find(bet => bet.match_id === fixture.code);

        // Add the current fixture to the div
        predictionsCard += await addMatchDiv(bet, fixture, opts.hasGameweekStarted);

    }

    predictionsCard += `
        </form>
    </div>
    `;
    
    return predictionsCard;

}

const addMatchDiv = async (bet, fixture, hasGameweekStarted) => {

    const exactScoreGuessed = fixture.team_h_score === bet?.goal1 && fixture.team_a_score === bet?.goal2;

    return `
    <div class="match-div${exactScoreGuessed ? ' exact' : ''}">
    
        <img src="./images/teams/${fixture.team_h_code}.png" alt="Example Image" class="team-image home">

        <div class="team home name">${fixture.team_h_name}</div>
        <div class="home">${fixture.started ? Number(fixture.team_h_score) : ''}</div>
        <input class="score-prediction"${hasGameweekStarted ? ' disabled' : ''} value="${bet?.goal1 ?? ''}" name="predictions[${fixture.code}][goal1]">
        
        <input class="score-prediction"${hasGameweekStarted ? ' disabled' : ''} value="${bet?.goal2 ?? ''}" name="predictions[${fixture.code}][goal2]">
        <div class="away">${fixture.started ? Number(fixture.team_a_score) : ''}</div>
        <div class="team away name">${fixture.team_a_name}</div>

        <img src="./images/teams/${fixture.team_a_code}.png" alt="Example Image" class="team-image away">

    </div>
    `;
}