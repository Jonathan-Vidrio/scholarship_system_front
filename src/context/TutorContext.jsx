import {createContext, useContext, useState} from "react";
import {
    disableTutor, enableTutor,
    getAllTutors,
    getDisabledTutors,
    getTutorById,
    getTutorsByFilter,
    postTutor,
    putTutor
} from "../api/tutor.js";

const TutorContext = createContext();

const useTutor = () => {
    const context = useContext(TutorContext);
    if (!context) {
        throw new Error('useTutor must be used within a TutorProvider');
    }
    return context;
}

const TutorProvider = ({children}) => {
    const [tutors, setTutors] = useState([]);
    const [tutor, setTutor] = useState(null);
    const [errors, setErrors] = useState(null);

    const getAll = async (token) => {
        try {
            const res = await getAllTutors(token);
            if (res.data) {
                setTutors(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async (token) => {
        try {
            const res = await getDisabledTutors(token);
            if (res.data) {
                setTutors(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (values, token) => {
        try {
            const res = await getTutorsByFilter(values, token);
            if (res.data) {
                setTutors(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getById = async (id, token) => {
        try {
            const res = await getTutorById(id, token);
            if (res.data) {
                setTutor(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByWorkerId = async (id, token) => {
        try {
            const res = await getTutorById(id, token);
            if (res.data) {
                setTutor(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const post = async (values, token) => {
        try {
            const res = await postTutor(values, token);
            if (res.data) {
                setTutor(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const put = async (id, values, token) => {
        try {
            const res = await putTutor(id, values, token);
            if (res.data) {
                setTutor(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const disable = async (id, token) => {
        try {
            const res = await disableTutor(id, token);
            if (res.status === 204) {
                setTutor(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const enable = async (id, token) => {
        try {
            const res = await enableTutor(id, token);
            if (res.status === 204) {
                setTutor(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const remove = async (id, token) => {
        try {
            const res = await disableTutor(id, token);
            if (res.status === 204) {
                setTutor(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    return (
        <TutorContext.Provider value={{
            tutors,
            setTutors,
            tutor,
            setTutor,
            errors,
            setErrors,
            getAll,
            getDisabled,
            getByFilter,
            getById,
            getByWorkerId,
            post,
            put,
            disable,
            enable,
            remove
        }}>
            {children}
        </TutorContext.Provider>
    );
}

export {
    useTutor,
    TutorProvider
}