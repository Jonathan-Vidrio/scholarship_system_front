const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/users/';

const getAllUsers = async (token) => {
    return fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getDisabledUsers = async (token) => {
    return fetch(API_URL + '/disabled', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getUsersByFilter = async (filter, token) => {
    return fetch(API_URL + '/filter' + filter, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getUsersByRole = async (role, token) => {
    return fetch(API_URL + '/role/' + role, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getUserById = async (userId, token) => {
    return fetch(API_URL + userId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getUserByEmail = async (email, token) => {
    return fetch(API_URL + '/email/' + email, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const postUser = async (user, token) => {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const putUser = async (id, user, token) => {
    return fetch(API_URL + id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const disableUser = async (userId, token) => {
    return fetch(API_URL + userId + '/disable', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const enableUser = async (userId, token) => {
    return fetch(API_URL + userId + '/enable', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const removeUser = async (userId, token) => {
    return fetch(API_URL + userId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

export {
    getAllUsers,
    getDisabledUsers,
    getUsersByFilter,
    getUsersByRole,
    getUserById,
    getUserByEmail,
    postUser,
    putUser,
    disableUser,
    enableUser,
    removeUser
}