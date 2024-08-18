const { footballData } = require('../fantasy-api.js');

// url = "http://127.0.0.1:5000"
const url = "https://pl-server.onrender.com";

// ALL OF THESE HAVE BEEN TRANSALTED BY CHATGPT
// TODO - LOOK THROUGH AND DOUBLE CHECK/TIDY UP

module.exports.getBet = async (access_token, id) => {
    try {
        const response = await fetch(url + '/bet/' + id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.deleteBet = async (access_token, id) => {
    try {
        const response = await fetch(url + '/bet/' + id, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.deleteAllBets = async (access_token) => {
    try {
        const response = await fetch(url + '/bet', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.getAllBets = async (access_token) => {
    try {
        const response = await fetch(url + '/bet', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.getAllBetsByUserId = async (access_token, userId) => {
    try {
        
        const response = await fetch(url + '/bet_by_user_id/' + userId, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {

            const responseBody = await response.json();
            return responseBody.map(match => ({ ...match, match_id: Number(match.match_id) }));

        } else {

            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };

        }
    } catch (err) {

        console.error('An error occurred:', err);
        return null;

    }
}

module.exports.postBet = async (access_token, match_id, goal1, goal2) => {
    try {
        const response = await fetch(url + '/bet', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "match_id": match_id,
                "goal1": goal1,
                "goal2": goal2,
                "done": "no"
            })
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else if (response.status === 405 || response.status === 500) {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.updateBet = async (access_token, match_id, goal1, goal2) => {
    try {
        const response = await fetch(url + '/bet', {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "match_id": match_id,
                "goal1": goal1,
                "goal2": goal2,
                "done": "no"
            })
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else if (response.status === 405) {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.updateMultipleBets = async (access_token, list_match_id, list_goal1, list_goal2) => {
    try {
        const response = await fetch(url + '/multiple_bets_update', {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "match_id": list_match_id,
                "goal1": list_goal1,
                "goal2": list_goal2
            })
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        }
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.updateMultipleBetsNew = async (access_token, bets) => {

    try {

        const response = await fetch(url + '/multiple_bets_update_new', {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bets)
        });

        if (response.ok) {
            console.log('Successfully updated bets');
            return await response.json();
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        }
        
    } catch (err) {
        console.error('An error occurred:', err);
        return null;
    }
}

// testData = {
//     'match_id': {
//         '2367792': { goal1: 1, goal2: 3 },
//         '2367878': { goal1: 1, goal2: 2 },
//         '2367879': { goal1: 1, goal2: 2 },
//         '2367880': { goal1: 1, goal2: 2 },
//         '2367881': { goal1: 1, goal2: 2 },
//         '2367882': { goal1: 1, goal2: 2 },
//         '2367883': { goal1: 1, goal2: 2 },
//         '2367884': { goal1: 1, goal2: 2 },
//         '2367885': { goal1: 1, goal2: 2 },
//         '2367886': { goal1: 1, goal2: 2 },
//         '2367887': { goal1: 1, goal2: 2 }
//     }
// }