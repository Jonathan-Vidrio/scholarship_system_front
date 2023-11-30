import {AppBar, Button, Grid, Toolbar, Typography} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import {useAuthentication} from "../../context/AuthenticationContext.jsx";

const ScholarNavbar = () => {
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
                        <Button color="inherit" component={Link} to={"/scholar/profile"}>Profile</Button>
                        <Button color="inherit" component={Link} to="/scholar/scholarchip">About</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit" component="div">
                            Scholarship System
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/login" onClick={onLogout}>Logout</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default ScholarNavbar;