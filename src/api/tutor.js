const API_URL = "https://scholarship-system-80b8c2223eed.herokuapp.com/api/tutors/";

const getAllTutors = async (token) => {
    try {
        const response = await fetch(API_URL, {
            method:  "GET",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const getDisabledTutors = async (token) => {
    try {
        const response = await fetch(API_URL + "disabled/", {
            method:  "GET",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const getTutorsByFilter = async (filter, token) => {
    try {
        const response = await fetch(API_URL + "filter/" + filter, {
            method:  "GET",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const getTutorById = async (id, token) => {
    try {
        const response = await fetch(API_URL + id, {
            method:  "GET",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const getTutorByWorkerId = async (workerId, token) => {
    try {
        const response = await fetch(API_URL + "worker/" + workerId, {
            method:  "GET",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const postTutor = async (tutor, token) => {
    try {
        const response = await fetch(API_URL, {
            method:  "POST",
            body:    JSON.stringify(tutor),
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const putTutor = async (id, tutor, token) => {
    try {
        const response = await fetch(API_URL + id, {
            method:  "PUT",
            body:    JSON.stringify(tutor),
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const disableTutor = async (id, token) => {
    try {
        const response = await fetch(API_URL + "disable/" + id, {
            method:  "DELETE",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const enableTutor = async (id, token) => {
    try {
        const response = await fetch(API_URL + "enable/" + id, {
            method:  "PATCH",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {
        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

const removeTutor = async (id, token) => {
    try {
        const response = await fetch(API_URL + id, {
            method:  "DELETE",
            headers: {
                "Content-Type":  "application/json",
                "Authorization": "Bearer " + token,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Undefined error");
        }

        return await response.json();
    }
    catch (error) {

        if (error.name === "TypeError") {
            return { message: "Connection failed" };
        }
        else {
            throw error;
        }
    }
}

export {
    getAllTutors, getDisabledTutors, getTutorsByFilter, getTutorById, getTutorByWorkerId, postTutor, putTutor, disableTutor, enableTutor, removeTutor,
}