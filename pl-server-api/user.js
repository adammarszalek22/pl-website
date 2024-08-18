// const url = "http://127.0.0.1:5000"
const url = "https://pl-server.onrender.com";

// ALL OF THESE HAVE BEEN TRANSALTED BY CHATGPT
// TODO - LOOK THROUGH AND DOUBLE CHECK/TIDY UP

/**
 * Creates a new user and returns authentication tokens.
 * 
 * @param {Object} userData - User data: 'username', 'password', 'password2'.
 * @returns {Promise<Object>} Object with 'access_token', 'refresh_token', and 'user_id'.
 * @throws {Error} If login fails or an error occurs during the request.
 */

module.exports.createUser = async (userData) => {

    try {

        const response = await fetch(url + '/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            return { ...await response.json(), username: userData.username };
        }

    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

/**
 * Logs in a user and returns authentication tokens.
 * 
 * @param {Object} userData - User data: 'username', 'password'.
 * @returns {Promise<Object>} Object with 'access_token', 'refresh_token', and 'user_id'.
 * @throws {Error} If login fails or an error occurs during the request.
 */

module.exports.login = async (userData) => {

    try {
        
        const response = await fetch(url + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            return { ...await response.json(), username: userData.username };
        }

    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

module.exports.getAllUsers = async (access_token) => {
    try {
        const response = await fetch(url + '/get_all', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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

module.exports.getNonFreshToken = async (refresh_token, username, password) => {
    try {
        const response = await fetch(url + '/refresh', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + refresh_token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        });

        if (response.ok) {
            const responseBody = await response.json();
            return responseBody.access_token;
        } else {
            console.error('Request failed:', response.statusText);
            return null;
        }
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}

module.exports.revokeJWT = async (access_token) => {
    try {
        const response = await fetch(url + '/logout', {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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

module.exports.myUserInfo = async (access_token, id) => {
    try {
        const response = await fetch(url + '/user/' + id, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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

module.exports.userInfoByPos = async (access_token, league_pos) => {
    try {
        const response = await fetch(url + '/user_pos', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            },
            body: JSON.stringify({ "position": league_pos })
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

module.exports.firstTen = async (access_token) => {
    try {
        const response = await fetch(url + '/first-ten', {
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

// TODO
module.exports.getUsers = async (access_token, page, limit, sortBy) => {

    try {

        if (!['username', 'points', 'position', 'three_pointers', 'one_pointers'].includes(sortBy)) {
            throw new Error(`Cannot sort by "${sortBy}"`);
        }

        const apiUrl = `${url}/users?sort_by=${sortBy}&page=${page}&limit=${limit}`;
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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

module.exports.getByUsername = async (access_token, username) => {
    try {

        const response = await fetch(url + '/user/' + username , {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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

module.exports.deleteAccount = async (access_token) => {
    try {
        const response = await fetch(url + '/delete', {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
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