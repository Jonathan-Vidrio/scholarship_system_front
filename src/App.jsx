import { Route, Routes } from "react-router-dom";
import Home from "./pages/info/Home.jsx";
import About from "./pages/info/About.jsx";
import Contact from "./pages/info/Contact.jsx";
import SignIn from "./pages/authentication/SignIn.jsx";
import SignUp from "./pages/authentication/SignUp.jsx";
import PasswordRecovery from "./pages/authentication/PasswordRecovery.jsx";
import Verify from "./pages/authentication/Verify.jsx";
import AppNavbar from "./components/AppNavbar.jsx";
import { Container } from "@mui/material";
import AdminNavbar from "./components/AdminNavbar.jsx";
import ScholarNavbar from "./components/ScholarNavbar.jsx";
import SuperadminNavbar from "./components/SuperadminNavbar.jsx";
import ScholarProfile from "./pages/scholar/ScholarProfile.jsx";
import ScholarScholarship from "./pages/scholar/ScholarScholarship.jsx";
import IndexScholars from "./pages/admin/scholars/IndexScholars.jsx";
import CreateScholar from "./pages/admin/scholars/CreateScholar.jsx";
import IndexScholarships from "./pages/admin/scholarships/IndexScholarships.jsx";
import CreateScholarship from "./pages/admin/scholarships/CreateScholarship.jsx";
import DetailsScholarship from "./pages/admin/scholarships/DetailsScholarship.jsx";
import { useAuthentication } from "./context/AuthenticationContext.jsx";
import EditScholarship from "./pages/admin/scholarships/EditScholarship.jsx";
import IndexTutors from "./pages/admin/tutors/IndexTutors.jsx"
import CreateTutor from "./pages/admin/tutors/CreateTutor.jsx"
import EditTutor from "./pages/admin/tutors/EditTutor.jsx"
import DetailsTutor from "./pages/admin/tutors/DetailsTutor.jsx"
import NotFoudPage from "./pages/NotFoudPage.jsx"

const App = () => {
    const {user: auth} = useAuthentication();
    return (<Container>
        {/* Barra de navegación */}
        {(!auth) && <AppNavbar/>}
        {(auth && auth.roleId === 1) && <SuperadminNavbar/>}
        {(auth && auth.roleId === 2) && <AdminNavbar/>}
        {(auth && auth.roleId === 3) && <ScholarNavbar/>}

        <Routes>
            {/* Contenido de la página */}
            <Route path="/" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>

            {/* Contenido de auth */}
            <Route path="/signin" element={<SignIn/>}/>
            <Route path="/password-recovery" element={<PasswordRecovery/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/signup/verify" element={<Verify/>}/>

            {/* Contenido de admin */}
            <Route path={"/admin/users"} element={<h1>Users</h1>}/>
            <Route path={"/admin/users/create"} element={<h1>Users/create</h1>}/>
            <Route path={"/admin/users/edit"} element={<h1>Users/edit</h1>}/>
            <Route path={"/admin/users/details"} element={<h1>Users/details</h1>}/>

            <Route path={"/admin/scholars"} element={<IndexScholars/>}/>
            <Route path={"/admin/scholars/create"} element={<CreateScholar/>}/>
            <Route path={"/admin/scholars/edit/:id"} element={<h1>Scholars/edit</h1>}/>
            <Route path={"/admin/scholars/details/:id"} element={<h1>Scholars/details</h1>}/>

            <Route path={"/admin/tutors"} element={<IndexTutors/>}/>
            <Route path={"/admin/tutors/create"} element={<CreateTutor/>}/>
            <Route path={"/admin/tutors/edit/:id"} element={<EditTutor/>}/>
            <Route path={"/admin/tutors/details/:id"} element={<DetailsTutor/>}/>

            <Route path={"/admin/scholarships"} element={<IndexScholarships/>}/>
            <Route path={"/admin/scholarships/create"} element={<CreateScholarship/>}/>
            <Route path={"/admin/scholarships/edit/:id"} element={<EditScholarship/>}/>
            <Route path="/admin/scholarships/details/:id" element={<DetailsScholarship/>}/>

            <Route path={"/admin/documents"} element={<h1>Documents</h1>}/>
            <Route path={"/admin/documents/details"} element={<h1>Documents/details</h1>}/>

            {/* Contenido de scholar */}
            <Route path="/scholar" element={<ScholarProfile/>}/>
            <Route path={"/scholar/profile"} element={<ScholarProfile/>}/>
            <Route path={"/scholar/scholarship"} element={<ScholarScholarship/>}/>

            <Route path="*" element={<NotFoudPage/>}/>
        </Routes>
    </Container>);
}

export default App;
