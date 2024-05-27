const fs = require('fs');

const NodeCache = require('node-cache');

const { myLeagues, leagues } = require('../../pl-server-api/leagues');


const leaguesCache = new NodeCache({ stdTTL: 120, checkperiod: 300 });


module.exports.getMyLeaguesPage = async (req, res) => {

    try {

        let myAdminLeagues = leaguesCache.get(`myLeagues_${req.session.sessionId}`);
        let joinedLeagues = leaguesCache.get(`leagues_${req.session.sessionId}`);

        if (myAdminLeagues === undefined || joinedLeagues === undefined) {

            [myAdminLeagues, joinedLeagues] = await Promise.all([
                myLeagues(req.session.accessToken),
                leagues(req.session.accessToken)
            ]);

            leaguesCache.set(`myLeagues_${req.session.sessionId}`, myAdminLeagues);
            leaguesCache.set(`leagues_${req.session.sessionId}`, joinedLeagues);

        }


        if (myAdminLeagues.statusCode !== 200 || joinedLeagues.statusCode !== 200) {
            // Display error on the webpage
        }

        const allLeagues = [...myAdminLeagues.leagues, ...joinedLeagues.leagues];

        let leagueDivs = '';
        for (const league of allLeagues) {
            leagueDivs += addLeagueDiv(league);
        }

        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(`${__dirname}/../../public/my-leagues.html`, 'utf-8');

        // Amending the HTML
        const completeHtml = rawHtml
            .replace('%MY_LEAGUES%', leagueDivs);

        // OR SHOULD I CACHE THIS
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

        const userId = positions[i];

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