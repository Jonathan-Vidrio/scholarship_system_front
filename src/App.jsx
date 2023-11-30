import {Route, Routes} from "react-router-dom";
import Home from "./pages/info/Home.jsx";
import About from "./pages/info/About.jsx";
import Contact from "./pages/info/Contact.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import PasswordRecovery from "./pages/authentication/PasswordRecovery.jsx";
import Verify from "./pages/authentication/Verify.jsx";
import AppNavbar from "./components/app/AppNavbar.jsx";
import {Container} from "@mui/material";
import {useAuthentication} from "./context/AuthenticationContext.jsx";
import AdminNavbar from "./components/admin/AdminNavbar.jsx";
import ScholarNavbar from "./components/scholar/ScholarNavbar.jsx";
import SuperadminNavbar from "./components/admin/SuperadminNavbar.jsx";
import ScholarRegisterForm from "./pages/scholar/ScholarRegisterForm.jsx";

const App = () => {
    const {user} = useAuthentication();

    return (
        <Container>
            {/* Barra de navegación */}
            {(!user) && <AppNavbar />}
            {(user && user.roleId === 1) && <SuperadminNavbar />}
            {(user && user.roleId === 2) && <AdminNavbar />}
            {(user && user.roleId === 3) && <ScholarNavbar />}

            <Routes>
                {/* Contenido de la página */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />

                {/* Contenido de auth */}
                <Route path="/login" element={<Login />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/verify" element={<Verify />} />

                {/* Contenido de admin */}

                {/* Contenido de scholar */}
                <Route path="/scholar" element={<ScholarRegisterForm />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Container>
    );
}

export default App;
