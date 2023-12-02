const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/tutors/';

const getAllTutors = async () => {
    return fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getDisabledTutors = async () => {
    return fetch(API_URL + '/disabled', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const getTutosByFilter = async (filter) => {
    return fetch(API_URL + '/filter/' + filter, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}