const API_URL = "https://scholarship-system-80b8c2223eed.herokuapp.com/api/scholarships/";

const getAllScholarships = async (token) => {
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

const getDisabledScholarships = async (token) => {
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

const getScholarshipsByFilter = async (filter, token) => {
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

const getScholarshipById = async (scholarshipId, token) => {
    try {
        const response = await fetch(API_URL + scholarshipId, {
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

const postScholarship = async (scholarship, token) => {
    try {
        const response = await fetch(API_URL, {
            method:  "POST",
            body:    JSON.stringify(scholarship),
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
};

const putScholarship = async (id, scholarship, token) => {
    try {
        const response = await fetch(API_URL + id, {
            method:  "PUT",
            body:    JSON.stringify(scholarship),
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

const disableScholarship = async (id, token) => {
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

const enableScholarship = async (id, token) => {
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

const removeScholarship = async (id, token) => {
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
    getAllScholarships, getDisabledScholarships, getScholarshipsByFilter, getScholarshipById, postScholarship, putScholarship, disableScholarship, enableScholarship, removeScholarship,
}