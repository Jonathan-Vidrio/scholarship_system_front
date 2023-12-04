import {createContext, useContext, useState} from "react";
import {loginRequest, registerRequest, verifyScholar} from "../api/authentication.js";

const AuthenticationContext = createContext();

const useAuthentication = () => {
    const context = useContext(AuthenticationContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

const AuthenticationProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState(null);
    const [isVerified, setIsVerified] = useState(false);

    const sign_up = async (values) => {
        try {
            const res = await registerRequest(values);
            if (res.data) {
                setUser(res.data.user);
                setToken(res.data.token);
                setIsAuthenticated(true);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const sign_in = async (values) => {
        try {
            const res = await loginRequest(values);
            if (res.data) {
                setUser(res.data.user);
                setToken(res.data.token);
                setIsAuthenticated(true);
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const verifyRegister = async (values) => {
        try {
            const res = await verifyScholar(values);
            if (res.data[0]) {
                console.log(res.data[0]);
                if (res.data[0].userId) {
                    throw new Error("User already verified");
                } else {
                    setIsVerified(true);
                }
            } else {
                setErrors(res.message);
            }
        } catch (error) {
            setErrors(error.message);
        }
    }

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthenticationContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                isAuthenticated,
                setIsAuthenticated,
                errors,
                setErrors,
                isVerified,
                setIsVerified,
                sign_up,
                sign_in,
                verifyRegister,
                logout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
}

export {
    AuthenticationContext,
    useAuthentication,
    AuthenticationProvider,
}