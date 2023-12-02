import {Box, Button, Container, Divider, Paper, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useAuthentication} from "../../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";
import {useScholar} from "../../context/ScholarContext.jsx";

const ScholarProfile = () => {
    const [isPersonalInfoEditable, setPersonalInfoEditable] = useState(false);
    const [showButtons, setShowButtons] = useState(false);

    const togglePersonalInfoEditable = () => {
        setPersonalInfoEditable(!isPersonalInfoEditable);
        setShowButtons(true);
    };

    const handleCancel = () => {
        setPersonalInfoEditable(!isPersonalInfoEditable);
        setShowButtons(false);
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const {
        user,
        isAuthenticated,
    } = useAuthentication();

    const {
        scholar,
        errors: ScholarErrors,
        setErrors,
        put,
    } = useScholar();

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || user.roleId !== 3) {
            navigate('*');
        }

        if (scholar) {
            setValue('name', scholar.name);
            setValue('firstLastName', scholar.firstLastName);
            setValue('secondLastName', scholar.secondLastName);
            setValue('birthDate', scholar.birthDate);
        }

        return () => {
            setErrors(null);
        }
    }, []);

    const onSubmit = handleSubmit(async (values) => {
        await put(scholar.id, values);
    });

    return (
        <Container component="main" maxWidth="sm" sx={{  mt: 8, justifyContent: 'left' }}>
            {/* Scholar Register Form */}
            <Paper style={{ padding: 20, marginTop: 20 }}>
                <Box sx={{ mb: 4 }}>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Personal Information
                    </Typography>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={togglePersonalInfoEditable}
                    >
                        Edit
                    </Button>
                </Box>
                    {
                        ScholarErrors &&
                        <Typography variant="body2" color="red">
                            {ScholarErrors}
                        </Typography>
                    }
                <Box sx={{ mb: 4 }}>
                <form onSubmit={onSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label={"Name"}
                        name="name"
                        autoComplete="name"
                        autoFocus
                        disabled={!isPersonalInfoEditable}
                        {...register('name', { required: true })}
                    />
                    {
                        errors.name &&
                        <Typography variant="body2" color="red">
                            This field is required
                        </Typography>
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstLastName"
                        label={"First Last Name"}
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        disabled={!isPersonalInfoEditable}
                        {...register('firstLastName', { required: true })}
                    />
                    {
                        errors.firstLastName &&
                        <Typography variant="body2" color="red">
                            This field is required
                        </Typography>
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="secondLastName"
                        label={"Second Last Name"}
                        name="lastname"
                        autoComplete="lastname"
                        autoFocus
                        disabled={!isPersonalInfoEditable}
                        {...register('secondLastName', { required: true })}
                    />
                    {
                        errors.secondLastName &&
                        <Typography variant="body2" color="red">
                            This field is required
                        </Typography>
                    }
                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        fullWidth
                        id={"curp"}
                        label={"CURP"}
                        name={"curp"}
                        autoComplete={"curp"}
                        autoFocus
                        disabled={true}
                    />
                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        fullWidth
                        id={"birthDate"}
                        label={"Birth Date"}
                        type={"date"}
                        name={"birthDate"}
                        autoComplete={"birthDate"}
                        autoFocus
                        disabled={!isPersonalInfoEditable}
                        {...register('birthDate', { required: true })}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            style={{ display: showButtons ? 'inline-block' : 'none' }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            style={{ display: showButtons ? 'inline-block' : 'none' }}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
                </Box>
                    <Divider />
                </Box>
                <Box sx={{ mb: 4 }}>
                {/* School Information */}
                <Typography variant="h6" gutterBottom>
                        School Information
                </Typography>
                <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="educationLevel"
                            label="Education Level"
                            name="educationLevel"
                            autoComplete="educationLevel"
                            autoFocus
                            disabled={true}
                        />
                </form>
                </Box>
                <Divider />
                <Box sx={{ mt: 4 }}>
            {/* Tutor Information */}
                    <Typography variant="h6" gutterBottom>
                        Tutor Information
                    </Typography>
                <form>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="tutorName"
                        label="Tutor Name"
                        name="tutorName"
                        autoComplete="tutorName"
                        autoFocus
                        disabled={true}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="tutorFirstLastName"
                        label="Tutor First Last Name"
                        name="tutorFirstLastName"
                        autoComplete="tutorFirstLastName"
                        autoFocus
                        disabled={true}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="tutorSecondLastName"
                        label="Tutor Second Last Name"
                        name="tutorSecondLastName"
                        autoComplete="tutorSecondLastName"
                        autoFocus
                        disabled={true}
                    />
                </form>
                </Box>
            </Paper>
        </Container>
    );
}

export default ScholarProfile;