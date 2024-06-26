class FootballData {

    constructor() {

        this.staticData = {};
        // All matches in an array
        this.fixturesData = [];
        // Same as this.fixturesData but has key(match): value 
        this.matchData = {};
        this.gameweeks = {};
        this.teams = {};

        this.currentGameweek = 1;

    }

    async initializeData(staticUrl, fixturesUrl) {

        try {

            // Fetching data
            const [staticDataResponse, fixturesResponse] = await Promise.all([
                fetch(staticUrl),
                fetch(fixturesUrl)
            ]);

            this.staticData = await staticDataResponse.json();
            this.fixturesData = await fixturesResponse.json();
    
            this.teams = {};
            
            // Storing teams information (name, code, etc.) with team id as key
            for (const team of this.staticData.teams) {
                this.teams[team.id] = team;
            }

            for (const match of this.fixturesData) {

                // Adding team names to the match object
                match.team_a_name = this.teams[match.team_a].name;
                match.team_h_name = this.teams[match.team_h].name;
                
                // Adding team codes
                match.team_a_code = this.teams[match.team_a].code;
                match.team_h_code = this.teams[match.team_h].code;
                
                // Converting kickoff time to a Date object
                match.kickoff_time = new Date(match.kickoff_time);
    
                // If no gameweek is assigned we store it as 0 (rather than the original null)
                this.gameweeks[match.event || 0] = this.gameweeks[match.event || 0] || [];
                this.gameweeks[match.event || 0].push(match);
                
                // Storing the result in an object accessible by match code
                this.matchData[match.code] = match;
            
            }

            this.findCurrentGameweek();

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

    findCurrentGameweek() {

        for (const [ gameweek, matches ] of Object.entries(this.gameweeks)) {
            
            // Skip gameweek 0 (which means matches that are not yet assigned or are postponed)
            if (gameweek == 0) continue;

            // If a match has not yet finished then this is the current gameweek
            for (const match of matches) {
                if (!match.finished) {
                    this.currentGameweek = match.event;
                    return;
                }
            }
        }

        // If the season has finished show last gameweek
        this.currentGameweek = 38;

    }

    getCurrentGameweek() {

        return this.currentGameweek;

    }

    hasGameweekStarted(gameweek) {

        for (const match of this.gameweeks[gameweek]) {
            if (match.started) return true;
        }

        return false;

    }

    hasCurrentGameweekStarted() {
        return hasGameweekStarted(this.currentGameweek);
    }

    getFixtureData(matchCode) {
        return this.matchData[matchCode];
    }

    getKickOffTime(matchCode) {
        return this.matchData[matchCode].kickoff_time;
    }
}

const footballData = new FootballData();

// Getting urls from the config
const staticUrl = process.env.FPL_STATIC_URL;
const fixturesUrl = process.env.FPL_FIXTURES_URL;

// THIS WILL HAVE TO BE FIXED (cannot have this without awaiting somewhere)
footballData.initializeData(staticUrl, fixturesUrl);

module.exports.footballData = footballData;