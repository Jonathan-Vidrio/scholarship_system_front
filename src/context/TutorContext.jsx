import {createContext, useContext, useState} from "react";

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
            if (res) {
                setTutors(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getDisabled = async () => {
        try {
            const res = await getDisabledTutors();
            if (res) {
                setTutors(res);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const getByFilter = async (values) => {
        try {
            const res = await getTutorsByFilter(values);
            if (res) {
                setTutors(res);
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
            setErrors
        }}>
            {children}
        </TutorContext.Provider>
    );
}

export {
    useTutor,
    TutorProvider
}