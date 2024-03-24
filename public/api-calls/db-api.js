// url = "http://127.0.0.1:5000"
const url = "https://pl-server.onrender.com"

/**
 * Creates a new user and returns authentication tokens.
 * 
 * @param {Object} userData - User data: 'username', 'password', 'password2'.
 * @returns {Promise<Object>} Object with 'access_token', 'refresh_token', and 'user_id'.
 * @throws {Error} If login fails or an error occurs during the request.
 */

export const createUser = async (userData) => {

    try {

        const response = await fetch(url + '/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            return await response.json();
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

export const login = async (userData) => {

    try {

        const response = await fetch(url + '/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        })

        if (response.ok) {
            return await response.json();
        }

    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

export const getAllUsers = async (access_token) => {
    try {
        const response = await fetch(url + '/get_all', {
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

export const getNonFreshToken = async (refresh_token, username, password) => {
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
            console.log(responseBody);
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

export const revokeJWT = async (access_token) => {
    try {
        const response = await fetch(url + '/logout', {
            method: "POST",
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

export const myUserInfo = async (access_token, id) => {
    try {
        const response = await fetch(url + '/user/' + id, {
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

export const userInfoByPos = async (access_token, league_pos) => {
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

export const firstTen = async (access_token) => {
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

export const getByUsername = async (access_token, username) => {
    try {
        const response = await fetch(url + '/user?username=' + username, {
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

export const deleteAccount = async (access_token) => {
    try {
        const response = await fetch(url + '/delete', {
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

export const getBet = async (access_token, id) => {
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

export const deleteBet = async (access_token, id) => {
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

export const deleteAllBets = async (access_token) => {
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

export const getAllBets = async (access_token) => {
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

export const getAllBetsByUserId = async (access_token) => {
    try {
        const response = await fetch(url + '/bet_by_user_id', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            const dict = {};
            responseBody.forEach(item => {
                dict[item.match_id] = item;
            });
            return { "status_code": 200, "list": responseBody, "dict": dict };
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status };
        }
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}

export const postBet = async (access_token, match_id, goal1, goal2) => {
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

export const updateBet = async (access_token, match_id, goal1, goal2) => {
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

export const updateMultipleBets = async (access_token, list_match_id, list_goal1, list_goal2) => {
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

export const getAllGroups = async (access_token) => {
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

export const deleteAllGroups = async (access_token, username, password) => {
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

export const getGroupById = async (access_token, id) => {
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

export const createGroup = async (access_token, name) => {
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

export const joinGroup = async (access_token, id) => {
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

export const deleteGroup = async (access_token, id) => {
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

export const deleteUserFromGroup = async (access_token, id, user_id) => {
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

export const myGroups = async (access_token) => {
    try {
        const response = await fetch(url + '/my_groups', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return { "status_code": response.status, "list": responseBody };
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status, "list": [] };
        }
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}

export const groupsImIn = async (access_token) => {
    try {
        const response = await fetch(url + '/groups_im_in', {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + access_token
            }
        });

        if (response.ok) {
            const responseBody = await response.json();
            console.log(responseBody);
            return { "status_code": response.status, "list": responseBody };
        } else {
            console.error('Request failed:', response.statusText);
            return { "status_code": response.status, "list": [] };
        }
    } catch(err) {
        console.error('An error occurred:', err);
        return null;
    }
}