import {createContext, useContext, useState} from "react";
import {
    disableScholarship, enableScholarship,
    getAllScholarships,
    getDisabledScholarships, getScholarshipById,
    getScholarshipsByFilter,
    postScholarship, putScholarship, removeScholarship
} from "../api/scholarship.js";

const ScholarshipContext = createContext();

const useScholarshipContext = () => {
    const context = useContext(ScholarshipContext);
    if (!context) {
        throw new Error(
            "ScholarshipContext must be used within a ScholarshipProvider"
        );
    }
    return context;
}

const ScholarshipProvider = ({ children }) => {
    const [scholarships, setScholarships] = useState([]);
    const [scholarship, setScholarship] = useState(null);
    const [errors, setErrors] = useState(null);

    const getAll = async (token) => {
        try {
            const res = await getAllScholarships(token);
            if (res.data) {
                setScholarships(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async (token) => {
        try {
            const res = await getDisabledScholarships(token);
            if (res.data) {
                setScholarships(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (filter, token) => {
        try {
            const res = await getScholarshipsByFilter(filter, token);
            if (res.data) {
                setScholarships(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getById = async (scholarshipId, token) => {
        try {
            const res = await getScholarshipById(scholarshipId, token);
            if (res.data) {
                setScholarship(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const post = async (scholarship, token) => {
        try {
            const res = await postScholarship(scholarship, token);
            if (res.data) {
                setScholarship(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const put = async (id, scholarship, token) => {
        try {
            const res = await putScholarship(id, scholarship, token);
            if (res.data) {
                setScholarship(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const disable = async (id, token) => {
        try {
            const res = await disableScholarship(id, token);
            if (res.status === 204) {
                setScholarship(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const enable = async (id, token) => {
        try {
            const res = await enableScholarship(id, token);
            if (res.status === 204) {
                setScholarship(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const remove = async (id, token) => {
        try {
            const res = await removeScholarship(id, token);
            if (res.status === 204) {
                setScholarship(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    return (
        <ScholarshipContext.Provider value={{
            scholarships,
            setScholarships,
            scholarship,
            setScholarship,
            errors,
            setErrors,
            getAll,
            getDisabled,
            getByFilter,
            getById,
            post,
            put,
            disable,
            enable,
            remove
        }}>
            {children}
        </ScholarshipContext.Provider>
    );
}

export {
    ScholarshipContext,
    ScholarshipProvider,
    useScholarshipContext
}