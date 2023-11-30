import { AppBar, Toolbar, Button, Typography, Grid } from '@mui/material';
import { Link } from 'react-router-dom';

const AppNavbar = () => {
    return (
        <AppBar>
            <Toolbar>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Button color="inherit" component={Link} to={"/"}>Home</Button>
                        <Button color="inherit" component={Link} to="/about">About</Button>
                        <Button color="inherit" component={Link} to="/contact">Contact</Button>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" color="inherit" component="div">
                            Scholarship System
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Button color="inherit" component={Link} to="/login">Login</Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default AppNavbar;