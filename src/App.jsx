import {Route, Routes} from "react-router-dom";
import Home from "./pages/info/Home.jsx";
import About from "./pages/info/About.jsx";
import Contact from "./pages/info/Contact.jsx";
import SignIn from "./pages/authentication/SignIn.jsx";
import SignUp from "./pages/authentication/SignUp.jsx";
import PasswordRecovery from "./pages/authentication/PasswordRecovery.jsx";
import Verify from "./pages/authentication/Verify.jsx";
import AppNavbar from "./components/AppNavbar.jsx";
import {Container} from "@mui/material";
import {useAuthentication} from "./context/AuthenticationContext.jsx";
import AdminNavbar from "./components/AdminNavbar.jsx";
import ScholarNavbar from "./components/ScholarNavbar.jsx";
import SuperadminNavbar from "./components/SuperadminNavbar.jsx";
import ScholarProfile from "./pages/scholar/ScholarProfile.jsx";
import ScholarScholarship from "./pages/scholar/ScholarScholarship.jsx";
import IndexScholars from "./pages/admin/scholars/IndexScholars.jsx";
import CreateScholar from "./pages/admin/scholars/CreateScholar.jsx";

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
                <Route path="/signin" element={<SignIn />} />
                <Route path="/password-recovery" element={<PasswordRecovery />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/signup/verify" element={<Verify />} />

                {/* Contenido de admin */}
                <Route path={"/admin/users"} element={<h1>Users</h1>} />
                <Route path={"/admin/users/create"} element={<h1>Users/create</h1>} />
                <Route path={"/admin/users/edit"} element={<h1>Users/edit</h1>} />
                <Route path={"/admin/users/details"} element={<h1>Users/details</h1>} />

                <Route path={"/admin/scholars"} element={<IndexScholars />} />
                <Route path={"/admin/scholars/create"} element={<CreateScholar />} />
                <Route path={"/admin/scholars/edit"} element={<h1>Scholars/edit</h1>} />
                <Route path={"/admin/scholars/details"} element={<h1>Scholars/details</h1>} />

                <Route path={"/admin/tutors"} element={<h1>Tutors</h1>} />
                <Route path={"/admin/tutors/create"} element={<h1>Tutors/create</h1>} />
                <Route path={"/admin/tutors/edit"} element={<h1>Tutors/edit</h1>} />
                <Route path={"/admin/tutors/details"} element={<h1>Tutors/details</h1>} />

                <Route path={"/admin/scholarships"} element={<h1>Scholarships</h1>} />
                <Route path={"/admin/scholarships/create"} element={<h1>Scholarships/create</h1>} />
                <Route path={"/admin/scholarships/edit"} element={<h1>Scholarships/edit</h1>} />
                <Route path={"/admin/scholarships/details"} element={<h1>Scholarships/details</h1>} />

                <Route path={"/admin/documents"} element={<h1>Documents</h1>} />
                <Route path={"/admin/documents/details"} element={<h1>Documents/details</h1>} />

                {/* Contenido de scholar */}
                <Route path="/scholar" element={<ScholarProfile />} />
                <Route path={"/scholar/profile"} element={<ScholarProfile />} />
                <Route path={"/scholar/scholarship"} element={<ScholarScholarship />} />

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Container>
    );
}

export default App;
