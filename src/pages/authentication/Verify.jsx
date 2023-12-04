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
            navigate('/signup');
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
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            justifyContent: 'center',
            padding: 4 // Adjust padding as needed
        }}>
            <Typography component="h1" variant="h5" gutterBottom>
                Verify Register
            </Typography>
            {
                VerifyErrors &&
                <Alert severity="error" sx={{ mb: 2, width: '100%' }}>
                    {VerifyErrors}
                </Alert>
            }
            <form onSubmit={onSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="workerId"
                    label="Worker Id"
                    name="workerId"
                    autoFocus
                    sx={{ mt: 2 }}
                    {...register('workerId', { required: true })}
                />
                {
                    errors.workerId &&
                    <Typography variant="body2" color="red">
                        This field is required
                    </Typography>
                }
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="curp"
                    label="CURP"
                    id="curp"
                    sx={{ mt: 2 }}
                    {...register('curp', { required: true })}
                />
                {
                    errors.curp &&
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
                    Verify
                </Button>
            </form>
        </Container>
    );
}

export default Verify;