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

    const getAll = async () => {
        try {
            const res = await getAllScholars();
            if (res) {
                setScholars(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async () => {
        try {
            const res = await getDisabledScholars();
            if (res) {
                setScholars(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (values) => {
        try {
            const res = await getScholarsByFilter(values);
            if (res) {
                setScholars(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByTutorId = async (id) => {
        try {
            const res = await getScholarByTutorId(id);
            if (res) {
                setScholars(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getById = async (id) => {
        try {
            const res = await getScholarById(id);
            if (res) {
                setScholar(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByUserId = async (id) => {
        try {
            const res = await getScholarByUserId(id);
            console.log(res);
            if (res) {
                setScholar(res[0]);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByCurp = async (curp) => {
        try {
            const res = await getScholarByCurp(curp);
            if (res) {
                setScholar(res[0]);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const post = async (values) => {
        try {
            const res = await postScholar(values);
            if (res) {
                setScholar(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const put = async (id, values) => {
        try {
            const res = await putScholar(id, values);
            if (res) {
                setScholar(res.data);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const disable = async (id) => {
        try {
            const res = await disableScholar(id);
            if (res.data) {
                setScholar(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const enable = async (id) => {
        try {
            const res = await enableScholar(id);
            if (res.data) {
                setScholar(null);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const remove = async (id) => {
        try {
            const res = await deleteScholar(id);
            if (res.data) {
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