import {Alert, Box, Button, Container, Divider, Paper, TextField, Typography} from "@mui/material";
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
        setErrors(null);
        setValues();
        setErrors(null);
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
    } = useForm();

    const {
        user,
        token,
        isAuthenticated,
    } = useAuthentication();

    const {
        scholar,
        errors: ScholarErrors,
        setErrors,
        put,
    } = useScholar();

    const setValues = () => {
        if (scholar) {
            setValue('name', scholar.name);
            setValue('firstLastName', scholar.firstLastName);
            setValue('secondLastName', scholar.secondLastName);
            setValue('curp', scholar.curp);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated || user.roleId !== 3) {
            navigate('*');
        } else {
            setValues();
        }

        return () => {
            setErrors(null);
        }
    }, [isAuthenticated, user, scholar]);

    const onSubmit = handleSubmit(async (values) => {
        await put(scholar.id, values, token);
        setPersonalInfoEditable(false);
        setShowButtons(false);
    });

    return (
        <Container component="main" maxWidth="md" sx={{mt: 8, justifyContent: 'left'}}>
            <Box sx={{padding: 4, marginTop: 4}}>
                <Box sx={{mb: 4}}>
                    <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Typography variant="h5" gutterBottom>
                            Personal Information
                        </Typography>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={togglePersonalInfoEditable}
                            disabled={isPersonalInfoEditable}
                            sx={{fontSize: '1rem'}}
                        >
                            Edit
                        </Button>
                    </Box>
                    {
                        ScholarErrors &&
                        <Alert severity="error" sx={{mb: 2}}>
                            {ScholarErrors}
                        </Alert>
                    }
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoComplete="name"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {color: 'black', fontSize: '1rem'},
                                readOnly: !isPersonalInfoEditable
                            }}
                            sx={{mb: 2}}
                            {...register('name', {required: true})}
                        />
                        {
                            errors.name &&
                            <Typography variant="body2" color="error" sx={{mt: 1}}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="firstLastName"
                            label="First Last Name"
                            name="lastname"
                            autoComplete="lastname"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {color: 'black', fontSize: '1rem'},
                                readOnly: !isPersonalInfoEditable
                            }}
                            sx={{mb: 2}}
                            {...register('firstLastName', {required: true})}
                        />
                        {
                            errors.firstLastName &&
                            <Typography variant="body2" color="error" sx={{mt: 1}}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="secondLastName"
                            label="Second Last Name"
                            name="lastname"
                            autoComplete="lastname"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {color: 'black', fontSize: '1rem'},
                                readOnly: !isPersonalInfoEditable
                            }}
                            sx={{mb: 2}}
                            {...register('secondLastName', {required: true})}
                        />
                        {
                            errors.secondLastName &&
                            <Typography variant="body2" color="error" sx={{mt: 1}}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="curp"
                            label="CURP"
                            name="curp"
                            autoComplete="curp"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                                style: {color: 'black'},
                                readOnly: true
                            }}
                            sx={{mb: 2}}
                            {...register('curp', {required: true})}
                        />
                        <Box sx={{mb: 4, display: 'flex', justifyContent: 'center', gap: 2}}>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{display: showButtons ? 'block' : 'none'}}
                                onClick={handleCancel}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                sx={{display: showButtons ? 'block' : 'none'}}
                            >
                                Save
                            </Button>
                        </Box>
                    </form>
                    <Divider />
                    {/* Scholar Information */}
                    <Typography variant="h5" gutterBottom sx={{mt: 4}}>
                        School Information
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        fullWidth
                        id={"educationLevel"}
                        label={"Education Level"}
                        name={"educationLevel"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            style: {color: 'black'},
                            readOnly: true
                        }}
                        sx={{mb: 4}}
                    />
                    <Divider />
                    <Typography variant={"h5"} gutterBottom sx={{mt: 4}}>
                        Tutor Information
                    </Typography>
                    <TextField
                        variant={"outlined"}
                        margin={"normal"}
                        fullWidth
                        id={"tutor"}
                        label={"Tutor"}
                        name={"tutor"}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            style: {color: 'black'},
                            readOnly: true
                        }}
                        sx={{mb: 4}}
                    />

                </Box>
            </Box>
        </Container>
    );
}

    export default ScholarProfile;