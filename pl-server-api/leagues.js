// url = "http://127.0.0.1:5000"
const url = "https://pl-server.onrender.com"

module.exports.getAllGroups = async (access_token) => {
    try {
        const response = await fetch(url + '/all_groups', {
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

module.exports.deleteAllGroups = async (access_token, username, password) => {
    try {
        const response = await fetch(url + '/all_groups', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
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

module.exports.getGroupById = async (access_token, id) => {
    try {
        const response = await fetch(url + '/groups', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id
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

module.exports.createGroup = async (access_token, name) => {
    try {
        const response = await fetch(url + '/groups', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "name": name
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

module.exports.joinGroup = async (access_token, id) => {
    try {
        const response = await fetch(url + '/groups', {
            method: "PUT",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id
            })
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return responseBody;
        } else if (response.status === 409) {
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

module.exports.deleteGroup = async (access_token, id) => {
    try {
        const response = await fetch(url + '/groups', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id
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

module.exports.deleteUserFromGroup = async (access_token, id, user_id) => {
    try {
        const response = await fetch(url + '/groups_users', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "id": id,
                "user_id": user_id
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

/**
 * Fetches the user's leagues from the server (only the ones that the user is an admin of)
 * @param {string} access_token - The access token for authentication.
 * @returns {object|null} An object containing the status code and leagues data if successful, or null if an error occurred.
 */
module.exports.myLeagues = async (access_token) => {
    
    try {

        const response = await fetch(url + '/my_groups', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            return { "status_code": response.status, "leagues": responseBody };
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status, "leagues": [] };
        }

    } catch(err) {

        console.error('An error occurred:', err);
        return null;

    }
}

/**
 * Fetches the user's leagues from the server (the ones that the user is not an admin of)
 * @param {string} access_token - The access token for authentication.
 * @returns {object|null} An object containing the status code and leagues data if successful, or null if an error occurred.
 */
module.exports.leagues = async (access_token) => {

    try {

        const response = await fetch(url + '/groups_im_in', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            return { "status_code": response.status, "leagues": responseBody };
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status, "leagues": [] };
        }

    } catch(err) {

        console.error('An error occurred:', err);
        return null;
        
    }
}