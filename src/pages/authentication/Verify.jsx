import {Alert, Button, Container, Paper, TextField, Typography} from "@mui/material";
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const Verify = () => {
    const {
        register,
            handleSubmit,
            formState: { errors }
    } = useForm();

    const {
        verifyRegister,
        isVerified,
        setIsVerified,
        errors: VerifyErrors,
        setErrors
    } = useAuthentication();

    const navigate = useNavigate();

    useEffect(() => {
        if (isVerified) {
            navigate('/register');
            setIsVerified(true);
        }

        return () => {
            setErrors(null);
        };

    }, [isVerified]);

    const onSubmit = handleSubmit(async (values) => {
        await verifyRegister(values);
    });

    return (
        <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
            <Paper elevation={6} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Typography component="h1" variant="h5" gutterBottom>
                    Verify Register
                </Typography>
                {
                    VerifyErrors &&
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {VerifyErrors}
                    </Alert>
                }
                <form onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="workerId"
                        label="Worker Id"
                        name="workerId"
                        autoFocus
                        sx={{ mt: 2 }}
                        {...register('workerId', { required: true })}
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
                        required
                        fullWidth
                        name="curp"
                        label="CURP"
                        id="curp"
                        sx={{ mt: 2 }}
                        {...register('curp', { required: true })}
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
                        Verify
                    </Button>
                </form>
            </Paper>
        </Container>
    );

}

export default Verify;