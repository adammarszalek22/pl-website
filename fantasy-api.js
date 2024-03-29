// Will move the urls to config file
// Using this for teams data (id, name, etc.)
this.staticUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';
// Matches data (kickoff time, home and away team, gameweek, goals scored, etc.)
this.urlFixtures = 'https://fantasy.premierleague.com/api/fixtures/';

class FootballData {

    constructor() {
        this.staticData = {};
        this.fixturesData = {};
    }

    async initializeData(staticUrl, urlFixtures) {
        const staticDataResponse = await fetch(staticUrl);
        const fixturesResponse = await fetch(urlFixtures);

        this.staticData = await staticDataResponse.json();
        this.fixturesData = await fixturesResponse.json();
    }
    
    getGameweekFromMatchCode = async (matchCode) => {

        const gameweekMatches = {};
    
        for (const match of fantasyData) {
    
            gameweekMatches[match.code] = match.event
        }
    
        console.error(gameweekMatches)
        return gameweekMatches;
    
    }
}

module.exports.getGameweekMatches2 = async () => {

    const response = await fetch(urlFixtures);
    const fantasyData = await response.json();

    const gameweekMatches = {};

    for (const match of fantasyData) {

        gameweekMatches[match.event || 0] = gameweekMatches[match.event || 0] || {};

        gameweekMatches[match.event || 0][match.code] = match;
    }

    console.error(gameweekMatches)
    return gameweekMatches;

}

module.exports.

module.exports.getCurrentGameweek = async () => {

}

module.exports.getTeamNames = async () => {

    const response = await fetch(staticUrl);
    const fantasyData = await response.json();

    return fantasyData.teams.map(team => team.code)

    const teams = {};

    for (const team of fantasyData.teams) {
        teams[team.code] = team.name;
    }

    console.error(teams)
    return teams;

}

// getGameweekMatches();
// getTeamNames();

