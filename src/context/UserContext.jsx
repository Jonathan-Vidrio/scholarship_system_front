import {createContext, useContext, useState} from "react";
import {
    disableUser, enableUser,
    getAllUsers,
    getDisabledUsers,
    getUserByEmail,
    getUserById,
    getUsersByFilter,
    getUsersByRole, postUser, putUser, removeUser
} from "../api/user.js";

const UserContext = createContext();

const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}

const UserProvider = ({children}) => {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState(null);
    const [errors, setErrors] = useState(null);

    const getAll = async (token) => {
        try {
            const res = await getAllUsers(token);
            if (res.data) {
                setUsers(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async (token) => {
        try {
            const res = await getDisabledUsers(token);
            if (res.data) {
                setUsers(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (values, token) => {
        try {
            const res = await getUsersByFilter(values, token);
            if (res.data) {
                setUsers(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByRole = async (role, token) => {
        try {
            const res = await getUsersByRole(role, token);
            if (res.data) {
                setUsers(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getById = async (id, token) => {
        try {
            const res = await getUserById(id, token);
            if (res.data) {
                setUser(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByEmail = async (email, token) => {
        try {
            const res = await getUserByEmail(email, token);
            if (res.data) {
                setUser(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const post = async (values, token) => {
        try {
            const res = await postUser(values, token);
            if (res.data) {
                setUser(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const put = async (id, values, token) => {
        try {
            const res = await putUser(id, values, token);
            if (res.data) {
                setUser(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const disable = async (id, token) => {
        try {
            const res = await disableUser(id, token);
            if (res.status === 204) {
                setUser(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const enable = async (id, token) => {
        try {
            const res = await enableUser(id, token);
            if (res.status === 204) {
                setUser(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const remove = async (id, token) => {
        try {
            const res = await removeUser(id, token);
            if (res.status === 204) {
                setUser(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    return (
        <UserContext.Provider value={{
            users,
            setUsers,
            user,
            setUser,
            errors,
            setErrors,
            getAll,
            getDisabled,
            getByFilter,
            getByRole,
            getById,
            getByEmail,
            post,
            put,
            disable,
            enable,
            remove
        }}>
            {children}
        </UserContext.Provider>
    );
}

export {
    useUser,
    UserProvider
}