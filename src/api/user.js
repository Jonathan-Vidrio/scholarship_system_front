const API_URL = "https://scholarship-system-80b8c2223eed.herokuapp.com/api/users/";

const getAllUsers = async (token) => {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const getDisabledUsers = async (token) => {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const getUsersByFilter = async (filter, token) => {
    try {
        const response = await fetch(API_URL + "filter/ " + filter, {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const getUsersByRole = async (role, token) => {
    try {
        const response = await fetch(API_URL + "role/" + role, {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const getUserById = async (userId, token) => {
    try {
        const response = await fetch(API_URL + userId, {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const getUserByEmail = async (email, token) => {
    try {
        const response = await fetch(API_URL + "/email/" + email, {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const postUser = async (user, token) => {
    const response = await fetch(API_URL, {
        method:  "POST",
        body:    JSON.stringify(user),
        headers: {
            "Content-Type":  "application/json",
            "Authorization": "Bearer " + token,
        },
    });
}

const putUser = async (id, user, token) => {
    const response = await fetch(API_URL + id, {
        method:  "PUT",
        body:    JSON.stringify(user),
        headers: {
            "Content-Type":  "application/json",
            "Authorization": "Bearer " + token,
        },
    });
}

const disableUser = async (userId, token) => {
    try {
        const response = await fetch(API_URL + userId + "/disable", {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const enableUser = async (userId, token) => {
    try {
        const response = await fetch(API_URL + userId + "/enable", {
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
            return { message: "Connection failed" }
        }
        else {
            throw error;
        }
    }
}

const removeUser = async (userId, token) => {
    try {
        const response = await fetch(API_URL + userId, {
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
            return { message: "Connection failed" }
        } else {
            throw error;
        }
    }
}

export {
    getAllUsers, getDisabledUsers, getUsersByFilter, getUsersByRole, getUserById, getUserByEmail, postUser, putUser, disableUser, enableUser, removeUser,
}