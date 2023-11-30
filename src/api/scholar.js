const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/';

const getAllScholars = async () => {
    return fetch(API_URL + 'scholar', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getDisabledScholars = async () => {
    return fetch(API_URL + 'scholar/disabled', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getScholarsByFilter = async (filter) => {
    return fetch(API_URL + 'scholar/filter' + filter, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getScholarByTutorId = async (tutorId) => {
    return fetch(API_URL + 'scholar/tutor/' + tutorId, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getScholarById = async (scholarId) => {
    return fetch(API_URL + 'scholar/' + scholarId, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getScholarByCurp = async (curp) => {
    return fetch(API_URL + 'scholar/curp/' + curp, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const getScholarByUserId = async (userId) => {
    return fetch(API_URL + 'scholar/user/' + userId, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const postScholar = async (scholar) => {
    return fetch(API_URL + 'scholar', {
        method: 'POST',
        body: JSON.stringify(scholar),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const putScholar = async (scholar) => {
    return fetch(API_URL + 'scholar', {
        method: 'PUT',
        body: JSON.stringify(scholar),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const disableScholar = async (scholarId) => {
    return fetch(API_URL + 'scholar/disable/' + scholarId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const enableScholar = async (scholarId) => {
    return fetch(API_URL + 'scholar/enable/' + scholarId, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

const deleteScholar = async (scholarId) => {
    return fetch(API_URL + 'scholar/' + scholarId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    });
}

export {
    getAllScholars,
    getDisabledScholars,
    getScholarsByFilter,
    getScholarByTutorId,
    getScholarById,
    getScholarByUserId,
    getScholarByCurp,
    postScholar,
    putScholar,
    disableScholar,
    enableScholar,
    deleteScholar
}