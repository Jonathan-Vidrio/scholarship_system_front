const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/';

const registerRequest = async (user) => {
    return fetch(API_URL + 'authentication/sign_up', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed'}
    });
}

const loginRequest = async (user) => {
    return fetch(API_URL + 'authentication/sign_in', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed'}
    });
}

const verifyScholar = async (data) => {
    return fetch(API_URL + 'authentication/verify_scholar', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed'}
    });
}

export {
    registerRequest,
    loginRequest,
    verifyScholar
}