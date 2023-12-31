import {createContext, useContext, useState} from "react";
import {
    deleteScholar,
    disableScholar, enableScholar,
    getAllScholars,
    getDisabledScholars, getScholarByCurp,
    getScholarById,
    getScholarByTutorId, getScholarByUserId,
    getScholarsByFilter, postScholar, putScholar
} from "../api/scholar.js";

const ScholarContext = createContext();

const useScholar = () => {
    const context = useContext(ScholarContext);
    if (!context) {
        throw new Error('useScholar must be used within a ScholarProvider');
    }
    return context;
}

const ScholarProvider = ({children}) => {
    const [scholars, setScholars] = useState([]);
    const [scholar, setScholar] = useState(null);
    const [errors, setErrors] = useState(null);

    const getAll = async (token) => {
        try {
            const res = await getAllScholars(token);
            if (res.data) {
                setScholars(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async (token) => {
        try {
            const res = await getDisabledScholars(token);
            if (res.data) {
                setScholars(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (values, token) => {
        try {
            const res = await getScholarsByFilter(values, token);
            if (res.data) {
                setScholars(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByTutorId = async (id, token) => {
        try {
            const res = await getScholarByTutorId(id, token);
            if (res.data) {
                setScholars(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getById = async (id, token) => {
        try {
            const res = await getScholarById(id, token);
            if (res.data) {
                setScholar(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByUserId = async (id, token) => {
        try {
            const res = await getScholarByUserId(id, token);
            if (res.data) {
                setScholar(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByCurp = async (curp, token) => {
        try {
            const res = await getScholarByCurp(curp, token);
            if (res.data[0]) {
                setScholar(res.data[0]);
            } else {
                setScholar(null);
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const post = async (values, token) => {
        try {
            const res = await postScholar(values, token);
            if (res.data) {
                setScholar(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const put = async (id, values, token) => {
        try {
            const res = await putScholar(id, values, token);
            if (res.data) {
                setScholar(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const disable = async (id, token) => {
        try {
            const res = await disableScholar(id, token);
            if (res.status === 204) {
                setScholar(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const enable = async (id, token) => {
        try {
            const res = await enableScholar(id, token);
            if (res.status === 204) {
                setScholar(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const remove = async (id, token) => {
        try {
            const res = await deleteScholar(id, token);
            if (res.status === 204) {
                setScholar(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    return (
        <ScholarContext.Provider value={{
            scholars,
            setScholars,
            scholar,
            setScholar,
            errors,
            setErrors,
            getAll,
            getDisabled,
            getByFilter,
            getByTutorId,
            getById,
            getByUserId,
            getByCurp,
            post,
            put,
            disable,
            enable,
            remove
        }}>
            {children}
        </ScholarContext.Provider>
    );
}

export {
    ScholarContext,
    ScholarProvider,
    useScholar
}