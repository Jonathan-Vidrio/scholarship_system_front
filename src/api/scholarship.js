const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/scholarships/';

const getAllScholarships = async (token) => {
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

const getDisabledScholarships = async (token) => {
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

const getScholarshipsByFilter = async (filter, token) => {
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

const getScholarshipById = async (scholarshipId, token) => {
    return fetch(API_URL + scholarshipId, {
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

const postScholarship = async (scholarship, token) => {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(scholarship),
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

const putScholarship = async (id ,scholarship, token) => {
    return fetch(API_URL + id, {
        method: 'PUT',
        body: JSON.stringify(scholarship),
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

const disableScholarship = async (id, token) => {
    return fecth(API_URL + 'disable/' + id, {
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

const enableScholarship = async (id, token) => {
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

const removeScholarship = async (id, token) => {
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
    getAllScholarships,
    getDisabledScholarships,
    getScholarshipsByFilter,
    getScholarshipById,
    postScholarship,
    putScholarship,
    disableScholarship,
    enableScholarship,
    removeScholarship
}