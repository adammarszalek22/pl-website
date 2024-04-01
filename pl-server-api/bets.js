const { footballData } = require('../fantasy-api.js');

// url = "http://127.0.0.1:5000"
const url = "https://pl-server.onrender.com"

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
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.getAllBetsByUserId = async (access_token) => {
    try {

        const response = await fetch(url + '/bet_by_user_id', {
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
    } catch(err) {

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
    } catch(err) {
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
    } catch(err) {
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
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}