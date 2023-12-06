import {Alert, Button, Container, Link, TextField, Typography} from "@mui/material";
import {useForm} from 'react-hook-form'
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useScholar} from "../../context/ScholarContext.jsx";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm();

    const {
        user,
        token,
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
        if (isAuthenticated && (user.roleId === 1 || user.roleId === 2)) {
            getByUserId(user.id, token).then(() => {
                navigate('/admin');
            });
        } else if (isAuthenticated && user.roleId === 3) {
            getByUserId(user.id, token).then(() => {
                navigate('/scholar');
            });
        }

        return () => {
            setErrors(null);
        }
    }, [isAuthenticated]);

    const onSubmit = handleSubmit(async (values) => {
        await sign_in(values);
    });

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
            padding: 4 // Adjust padding as needed
        }}>
            <Typography component="h1" variant="h5" gutterBottom>
                Sign in
            </Typography>
            {
                LoginErrors &&
                <Alert severity="error" sx={{mb: 2, width: '100%'}}>
                    {LoginErrors}
                </Alert>
            }
            <form onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    type="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    sx={{mt: 2}}
                    {...register('email', {required: true})}
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
                    autoComplete="password"
                    sx={{mt: 2}}
                    {...register('password', {required: true})}
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
                    sx={{mt: 3, mb: 2, bgcolor: 'primary.main'}} // Adjust the bgcolor to match the image
                >
                    Sign In
                </Button>
            </form>
            {/*
            <Link href={"/recovery-password"} variant="body2" sx={{mt: 2}}>
                Forgot password?
            </Link>
            */}
            <Link href={"/signup/verify"} variant="body2" sx={{mt: 2}}>
                Don't have an account? Sign Up
            </Link>
        </Container>
    );
}

    export default SignIn;