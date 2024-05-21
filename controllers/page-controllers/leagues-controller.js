const fs = require('fs');

const { myLeagues, leagues } = require('../../pl-server-api/leagues');

module.exports.getMyLeaguesPage = async (req, res) => {
    
    try {

        const myAdminLeagues = await myLeagues(req.session.accessToken);

        const joinedLeagues = await leagues(req.session.accessToken);

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

        res.send(completeHtml);
    
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

    let leagueDiv = `
    <div class="league-small">
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