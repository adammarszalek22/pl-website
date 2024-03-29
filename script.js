// This gets logo images for all premier league teams

const { getTeamNames } = require('./fantasy-api.js');

const fs = require('fs')

async function downloadImage(url) {

    let response = await fetch(url);

    response = await response.arrayBuffer();

    response = Buffer.from(response);

    return response;
}

async function main () {
    const names = await getTeamNames();

    for (const number of names) {
        const image = await downloadImage(`https://resources.premierleague.com/premierleague/badges/50/t${number}.png`);
        fs.writeFileSync(`./images/${number}.png`, image, () => {})
    }
}

// main();
