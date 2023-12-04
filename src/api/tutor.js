const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/tutors/';

const getAllTutors = async (token) => {
    return fetch(API_URL, {
        method: 'GET',
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

const getDisabledTutors = async (token) => {
    return fetch(API_URL + '/disabled', {
        method: 'GET',
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

const getTutorsByFilter = async (filter, token) => {
    return fetch(API_URL + '/filter/' + filter, {
        method: 'GET',
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

const getTutorById = async (id, token) => {
    return fetch(API_URL + id, {
        method: 'GET',
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

const getTutorByWorkerId = async (workerId, token) => {
    return fetch(API_URL + 'worker/' + workerId, {
        method: 'GET',
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

const postTutor = async (tutor, token) => {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(tutor),
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

const putTutor = async (tutor, token) => {
    return fetch(API_URL + tutor.id, {
        method: 'PUT',
        body: JSON.stringify(tutor),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
        }
    }).then(response => {
        return response.json();
    });
}

const disableTutor = async (id, token) => {
    return fetch(API_URL + 'disable/' + id, {
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

const enableTutor = async (id, token) => {
    return fetch(API_URL + 'enable/' + id, {
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

const removeTutor = async (id, token) => {
    return fetch(API_URL + id, {
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
    getAllTutors,
    getDisabledTutors,
    getTutorsByFilter,
    getTutorById,
    getTutorByWorkerId,
    postTutor,
    putTutor,
    disableTutor,
    enableTutor,
    removeTutor
}