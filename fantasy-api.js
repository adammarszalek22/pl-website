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
        // Same as this.fixturesData but has key(match): value 
        this.matchData = {};
        this.gameweeks = {};

    }

    async initializeData(staticUrl, fixturesUrl) {

        try {

            // Getting urls from the config
            const staticUrl = process.env.FPL_STATIC_URL;
            const fixturesUrl = process.env.FPL_FIXTURES_URL;

            // Fetching data
            const staticDataResponse = await fetch(staticUrl);
            const fixturesResponse = await fetch(fixturesUrl);

            this.staticData = await staticDataResponse.json();
            this.fixturesData = await fixturesResponse.json();
    
            const teamNames = {};
            const teamCodes = {};
            
            // Quick loop to 
            for (const team of this.staticData.teams) {
                teamNames[team.id] = team.name;
                teamCodes[team.id] = team.code;
            }
    
            for (const match of this.fixturesData) {
    
                // If no gameweek is assigned we store it as 0 (rather than the original null)
                this.gameweeks[match.event || 0] = this.gameweeks[match.event || 0] || [];
                this.gameweeks[match.event || 0].push(match);
                
                // Adding team names to the match object
                match.team_a_name = teamNames[match.team_a];
                match.team_h_name = teamNames[match.team_h];
                
                // Adding team codes
                match.team_a_code = teamCodes[match.team_a];
                match.team_h_code = teamCodes[match.team_h];
                
                // Converting kickoff time to a Date object
                match.kickoff_time = new Date(match.kickoff_time);
                
                this.matchData[match.code] = match;
            
            }

        } catch(error) {
            console.error('Error initializing data');
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

    getKickOffTime(matchCode) {
        return this.matchData[matchCode].kickoff_time;
    }
}

const footballData = new FootballData();

// this needs to be fixed
footballData.initializeData(staticUrl, fixturesUrl);

module.exports.footballData = footballData;