const fs = require('fs');
const path = require('path');

const NodeCache = require('node-cache');

const { createLeague, joinLeague, myLeagues, leagues } = require('../../pl-server-api/leagues');


const leaguesCache = new NodeCache({ stdTTL: 120, checkperiod: 300 });


module.exports.getMyLeaguesPage = async (req, res) => {

    try {

        // If this controller is the result of a POST (Create a League or Join a League) then make the respective api calls
        let messages = [];
        if (req.body.createLeague || req.body.joinLeague) {
            messages.push(await createOrJoinLeague(req));
        }

        let myAdminLeagues = leaguesCache.get(`myLeagues_${req.session.sessionId}`);
        let joinedLeagues = leaguesCache.get(`leagues_${req.session.sessionId}`);

        // If there are no cached responses or if a new league was just added/joined then get fresh responses
        if (myAdminLeagues === undefined || joinedLeagues === undefined || req.body.createLeague || req.body.joinLeague) {

            [myAdminLeagues, joinedLeagues] = await Promise.all([
                myLeagues(req.session.accessToken),
                leagues(req.session.accessToken)
            ]);

            leaguesCache.set(`myLeagues_${req.session.sessionId}`, myAdminLeagues);
            leaguesCache.set(`leagues_${req.session.sessionId}`, joinedLeagues);

        }


        if (myAdminLeagues.statusCode !== 200 || joinedLeagues.statusCode !== 200) {
            messages.push('Could not fetch your leagues.');
        }

        const allLeagues = [...myAdminLeagues.leagues, ...joinedLeagues.leagues];

        let leagueDivs = '';
        for (const league of allLeagues) {
            leagueDivs += addLeagueDiv(league);
        }

        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(path.join(__dirname, '..', '..', 'public', 'my-leagues.html'), 'utf-8');

        const popupMessages = messages.reduce((output, message) => output + message + '\n', '').slice(0, -1);
        // Amending the HTML
        const completeHtml = rawHtml
            .replace('%MY_LEAGUES%', leagueDivs)
            .replace('%ERROR_MESSAGE_OR_NOTHING%', messages.reduce((output, message) => output + message + '\n', '').slice(0, -1))
            .replace('%HIDE%', popupMessages ? '' : 'class="hide"');

        res.send(completeHtml);

    } catch (error) {

        console.log(error)
        res
            .status(401)
            .json({
                message: 'Error sending the html'
            })

    }

}

const addLeagueDiv = (league) => {

    if (!league.positions) return '';
    
    const positions = league.positions.split(' ').map(Number);
    
    let leagueDiv = `
    <div class="league-small">
        <div class="league-name">${league.name}</div>
        <div class="league-row league-headings">
            <p>User</p>
            <p>Position</p>
            <p>Points</p>
            <p>One pointers</p>
            <p>Exact Scores</p>
        </div>
    `;

    for (let i = 0; i < 3; i++) {

        const userId = (positions || [])[i];

        const user = league.user.find(user => user.id === userId);

        leagueDiv += `
        <div class="league-row league-leader">
            <p>${user?.username ?? ''}</p>
            <p>${user?.position ?? ''}</p>
            <p>${user?.points ?? ''}</p>
            <p>${user?.one_pointers ?? ''}</p>
            <p>${user?.three_pointers ?? ''}</p>
        </div>
        `;
    }

    leagueDiv += `
        <div class="show-league">
            <button class="show-league-button">Show League</button>
        </div>
    </div>
    `;

    return leagueDiv;

}

const createOrJoinLeague = async (req) => {

    if (req.body.createLeague) {

        const response = await createLeague(req.session.accessToken, req.body.createLeague);
        
        if (response.statusCode === 409) return `Could not create the league "${req.body.createLeague}". A league with this name already exists.`;
        if (!response || response.statusCode != 201) return `Could not create the league "${req.body.createLeague}". Unknown error occured.`;

        return `League "${req.body.createLeague}" created successfully. It might take a few minutes for it to be added to the database.`;

    }

    if (req.body.joinLeague) {

        const response = await joinLeague(req.session.accessToken, req.body.joinLeague);

        if (response.statusCode === 404) return `League with id ${req.body.joinLeague} was not found`;
        if (response.statusCode === 409) return `You are already in the league with id ${req.body.joinLeague}.`;
        if (!response || response.statusCode != 200) return `Could not join the league with id "${req.body.joinLeague}"`;

        return `You successfully joined the league "${req.body.joinLeague}".`;

    }
    

}