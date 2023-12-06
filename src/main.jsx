import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {AuthenticationProvider} from "./context/AuthenticationContext.jsx";
import {BrowserRouter} from "react-router-dom";
import {CssBaseline} from "@mui/material";
import {ScholarProvider} from "./context/ScholarContext.jsx";
import {ScholarshipProvider} from "./context/ScholarshipContext.jsx";
import {TutorProvider} from "./context/TutorContext.jsx";
import {UserProvider} from "./context/UserContext.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthenticationProvider>
            <UserProvider>
                <ScholarProvider>
                    <ScholarshipProvider>
                        <TutorProvider>
                            <CssBaseline />
                            <App />
                        </TutorProvider>
                    </ScholarshipProvider>
                </ScholarProvider>
            </UserProvider>
        </AuthenticationProvider>
    </BrowserRouter>
);

