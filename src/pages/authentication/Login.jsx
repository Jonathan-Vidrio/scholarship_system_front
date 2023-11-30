import {Alert, Button, Container, Paper, TextField, Typography, Link} from "@mui/material";
import {useForm} from 'react-hook-form'
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useScholar} from "../../context/ScholarContext.jsx";

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const {
        user,
        isAuthenticated,
        errors: LoginErrors,
        setErrors,
        sign_in
    } = useAuthentication();

    const {
        getByUserId,
    } = useScholar();

    const navigate = useNavigate();

    useEffect(() => {
        return () => {
            setErrors(null);
        }
    }, []);

    const onSubmit = handleSubmit(async (values) => {
        await sign_in(values);
        if (isAuthenticated && user.roleId === (1 || 2)) {
            navigate('/admin/home');
        } else if (isAuthenticated && user.roleId === 3) {
            navigate('/scholar');
        }
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Log in to your account
                </Typography>
                {
                    LoginErrors &&
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {LoginErrors}
                    </Alert>
                }
                <form onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        sx={{ mt: 2 }}
                        {...register('email', { required: true })}
                    />
                    {
                        errors.email &&
                        <Typography variant="body2" color="red">
                            This field is required
                        </Typography>
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        sx={{ mt: 2 }}
                        {...register('password', { required: true })}
                    />
                    {
                        errors.password &&
                        <Typography variant="body2" color="red">
                            This field is required
                        </Typography>
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Log In
                    </Button>
                </form>
                <Link href={"/recovery-password"} variant="body2" sx={{ mt: 2 }}>
                    Forgot your password?
                </Link>
                <Link href={"/register/verify"} variant="body2" sx={{ mt: 2 }}>
                    {"Don't have an account? Sign Up"}
                </Link>
            </Paper>
        </Container>
    );
}

export default Login;