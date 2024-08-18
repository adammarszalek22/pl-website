const path = require('path');
const fs = require('fs');
const NodeCache = require('node-cache');

const { getUsers } = require('../../pl-server-api/user');


// Storing leaderboard pages for faster page reloading (expires after 2 min)
const usersCache = new NodeCache({ stdTTL: 120, checkperiod: 300 });


module.exports.getLeaderboardPage = async (req, res) => {

    try {

        let page = req.query.page || 1;
        const limit = 10;

        let users = usersCache.get(`users_${req.session.sessionId}_${page}`);

        if (users === undefined) {

            users = await getUsers(req.session.accessToken, page, limit, 'position');

            // If there is no data for particular page then we have reached the end of users list, showing the last page
            if (users.length === 0) {
                page = Math.max(page - 1, 1);
                users = await getUsers(req.session.accessToken, page, limit, 'position');
            }

            usersCache.set(`users_${req.session.sessionId}_${page}`, users);

        } else {
            console.log(req.session.sessionId);
        }
        
        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(path.join(__dirname, '../../public/leaderboard.html'), 'utf-8');

        // Populating the HTML with data
        const leaderboardDiv = getLeaderboardDiv(users);

        const completeHtml = rawHtml
        .replace('%LEADERBOARD_CONTENT%', leaderboardDiv)
        .replace('%PAGE_ID%', page)
        .replace('%PAGE%', `Positions ${page * 10 - 9} - ${page * 10}`)

        res.send(completeHtml);

    } catch(error) {

        res
        .status(401)
        .json({
            message: 'Error sending the html'
        })

    }
}

const getLeaderboardDiv = (tenUsers) => {

    return tenUsers
    .reduce((htmlDiv, user) => htmlDiv + `
        <div class="user-row">
            <p>${user.position}</p>
            <p>${user.username}</p>
            <p>${user.points}</p>
            <p>${user.one_pointers}</p>
            <p>${user.three_pointers}</p>
        </div>
    `, ``);

    let htmlDiv = ``;

    for (const user of tenUsers) {

        htmlDiv += `
        <div class="user-row">
            <p>${user.position}</p>
            <p>${user.username}</p>
            <p>${user.points}</p>
            <p>${user.one_pointers}</p>
            <p>${user.three_pointers}</p>
        </div>
        `;

    }

    return htmlDiv;

}