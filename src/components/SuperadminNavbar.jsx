import {useAuthentication} from "../context/AuthenticationContext.jsx";
import {Link, useNavigate} from "react-router-dom";
import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";

const SuperadminNavbar = () => {
    const {
        logout,
    } = useAuthentication();

    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Button color="inherit" component={Link} to={"/admin/users"}>Users</Button>
                        <Button color="inherit" component={Link} to="/admin/scholars">Scholars</Button>
                        <Button color="inherit" component={Link} to="/admin/tutors">Tutors</Button>
                        <Button color="inherit" component={Link} to="/admin/scholarchips">Scholarships</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit" component="div">
                            Scholarship System
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/signin" onClick={onLogout}>Sign Out</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default SuperadminNavbar;