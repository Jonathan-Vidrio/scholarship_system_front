const API_URL = 'https://scholarship-system-80b8c2223eed.herokuapp.com/api/scholars/';

const getAllScholars = async () => {
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

const getDisabledScholars = async () => {
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

const getScholarsByFilter = async (filter) => {
    return fetch(API_URL + '/filter' + filter, {
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

const getScholarByTutorId = async (tutorId) => {
    return fetch(API_URL + '/tutor/' + tutorId, {
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

const getScholarById = async (scholarId) => {
    return fetch(API_URL + scholarId, {
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

const getScholarByCurp = async (curp) => {
    return fetch(API_URL + '/curp/' + curp, {
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

const getScholarByUserId = async (userId) => {
    return fetch(API_URL + '/user/' + userId, {
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

const postScholar = async (scholar) => {
    return fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(scholar),
        headers: {
        'Content-Type': 'application/json',
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const putScholar = async (scholar) => {
    return fetch(API_URL, {
        method: 'PUT',
        body: JSON.stringify(scholar),
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const disableScholar = async (scholarId) => {
    return fetch(API_URL + '/disable/' + scholarId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const enableScholar = async (scholarId) => {
    return fetch(API_URL + '/enable/' + scholarId, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
    });
}

const deleteScholar = async (scholarId) => {
    return fetch(API_URL + scholarId, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json();
    }).catch(() => {
        return { message: 'Connection failed' }
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