import { createContext, useContext, useState } from "react";
import { disableTutor, enableTutor, getAllTutors, getDisabledTutors, getTutorById, getTutorByWorkerId, getTutorsByFilter, postTutor, putTutor, removeTutor } from "../api/tutor.js";

const TutorContext = createContext();

const useTutor = () => {
    const context = useContext(TutorContext);
    if (!context) {
        throw new Error("useTutor must be used within a TutorProvider");
    }
    return context;
}

const TutorProvider = ({ children }) => {
    const [tutors, setTutors] = useState([]);
    const [tutor, setTutor] = useState(null);
    const [errors, setErrors] = useState(null);

    const getAll = async (token) => {
        try {
            const res = await getAllTutors(token);
            if (res.data) {
                setTutors(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const getDisabled = async (token) => {
        try {
            const res = await getDisabledTutors(token);
            if (res.data) {
                setTutors(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const getByFilter = async (filter, token) => {
        try {
            const res = await getTutorsByFilter(filter, token);
            if (res.data) {
                setTutors(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const getById = async (id, token) => {
        try {
            const res = await getTutorById(id, token);
            if (res.data) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const getByWorkerId = async (workerId, token) => {
        try {
            const res = await getTutorByWorkerId(workerId, token);
            if (res.data) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const post = async (tutor, token) => {
        try {
            const res = await postTutor(tutor, token);
            if (res.data) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const put = async (id, tutor, token) => {
        try {
            const res = await putTutor(id, tutor, token);
            if (res.data) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const disable = async (id, token) => {
        try {
            const res = await disableTutor(id, token);
            if (res === 204) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const enable = async (id, token) => {
        try {
            const res = await enableTutor(id, token);
            if (res === 204) {
                setTutor(res.data);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
        }
    }

    const remove = async (id, token) => {
        try {
            const res = await removeTutor(id, token);
            if (res === 204) {
                setTutor(null);
            }
            else {
                setErrors(res.message);
            }
            return res;
        }
        catch (error) {
            setErrors(error.message);
            throw error;
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
            remove,
        }}>
            {children}
        </TutorContext.Provider>
    );
}

export {
    useTutor, TutorProvider,
}