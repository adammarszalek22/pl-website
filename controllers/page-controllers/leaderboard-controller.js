const path = require('path');
const fs = require('fs');

const { getUsers } = require('../../pl-server-api/user');

module.exports.getLeaderboardPage = async (req, res) => {

    try {

        const users = await getUsers(req.session.accessToken, req.query.page || 1, 10, 'position');
        
        // Getting raw HTML from the public folder
        const rawHtml = await fs.promises.readFile(`${__dirname}/../../public/leaderboard.html`, 'utf-8');

        const leaderboardDiv = getLeaderboardDiv(users);

        const completeHtml = rawHtml
        .replace('%LEADERBOARD_CONTENT%', leaderboardDiv)
        .replace('%PAGE%', req.query.page || 1)

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