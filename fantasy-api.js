// Will move the urls to config file
// Using this for teams data (id, name, etc.)
const staticUrl = 'https://fantasy.premierleague.com/api/bootstrap-static/';
// Matches data (kickoff time, home and away team, gameweek, goals scored, etc.)
const fixturesUrl = 'https://fantasy.premierleague.com/api/fixtures/';

class FootballData {

    constructor() {

        this.staticData = {};
        // All matches in an array
        this.fixturesData = [];
        // All matches in an object (to avoid looping through the array every time)
        this.matchData = {};
        this.gameweeks = {};

    }

    async initializeData(staticUrl, fixturesUrl) {

        const staticDataResponse = await fetch(staticUrl);
        const fixturesResponse = await fetch(fixturesUrl);

        this.staticData = await staticDataResponse.json();
        this.fixturesData = await fixturesResponse.json();

        const teams = {};
        const imageCode = {};
    
        for (const team of this.staticData.teams) {
            teams[team.id] = team.name;
            imageCode[team.id] = team.code;
        }

        for (const match of this.fixturesData) {


            // If no gameweek is assigned we store it as 0 (rather than the original null)
            this.gameweeks[match.event || 0] = this.gameweeks[match.event || 0] || [];
            this.gameweeks[match.event || 0].push(match);

            match.team_a_name = teams[match.team_a];
            match.team_h_name = teams[match.team_h];

            match.team_a_image_id = imageCode[match.team_a];
            match.team_h_image_id = imageCode[match.team_h];

            this.matchData[match.code] = match;
        }
    }

    getGameweekFromMatchCode(matchCode) {
        return this.matchData[matchCode].event;
    }

    getGameweekMatches(gameweek) {
        return this.gameweeks[gameweek];
    }

    getCurrentGameweek() {
        for (const [ gameweek, matches ] of Object.entries(this.gameweeks)) {
            
            // Skip gameweek 0 (which means matches that are not yet assigned or are postponed)
            if (gameweek == 0) continue;

            // If a match has not yet finished then this is the current gameweek
            for (const match of matches) {
                if (!match.finished) return match.event;
            }
        }

    }

    getFixtureData(matchCode) {
        return this.matchData[matchCode];
    }
}

const footballData = new FootballData();

// this needs to be fixed
footballData.initializeData(staticUrl, fixturesUrl);

module.exports.footballData = footballData;