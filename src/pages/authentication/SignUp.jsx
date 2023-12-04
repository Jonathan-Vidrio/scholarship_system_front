import {useForm} from "react-hook-form";
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {Alert, Button, Container, Paper, TextField, Typography} from "@mui/material";

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const {
        user,
        isAuthenticated,
        isVerified,
        errors: RegisterErrors,
        setErrors,
        sign_up
    } = useAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated && user.roleId === (1 || 2)) {
            navigate('/admin/dashboard');
        } else if (isAuthenticated && user.roleId === 3) {
            navigate('/scholar/dashboard');
        } else if (!isVerified) {
            navigate('/register/verify');
        }

        return () => {
            setErrors(null);
        }
    }, []);

    const onSubmit = handleSubmit(async (values) => {
        if (values.email.indexOf('@') === -1 || values.email.indexOf('.') === -1) {
            setErrors('Required valid email address');
            return;
        } else if (values.password !== values.confirmPassword) {
            setErrors('Password and Confirm Password must be the same');
            return;
        } else if (values.password.length < 8) {
            setErrors('Password must be at least 8 characters');
            return;
        } else if (values.password.length > 20) {
            setErrors('Password must be less than 20 characters');
            return;
        }
        await sign_up(values);
    });

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
            padding: 4 // Add padding to match the design you want
        }}>
            <Typography component="h1" variant="h5" gutterBottom>
                Sign Up
            </Typography>
            {
                RegisterErrors &&
                <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                    {RegisterErrors}
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    sx={{ mt: 2 }}
                    {...register('confirmPassword', { required: true })}
                />
                {
                    errors.confirmPassword &&
                    <Typography variant="body2" color="red">
                        This field is required
                    </Typography>
                }
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, bgcolor: 'primary.main' }} // Adjust the bgcolor to match the design
                >
                    Register
                </Button>
            </form>
        </Container>
    );
}

export default SignUp;