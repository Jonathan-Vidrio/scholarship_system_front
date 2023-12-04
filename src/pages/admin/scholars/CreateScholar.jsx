import {
    Alert,
    Box,
    Button,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAuthentication} from "../../../context/AuthenticationContext.jsx";
import {useScholar} from "../../../context/ScholarContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const CreateScholar = () => {
    const [scholarship, setScholarship] = useState('');
    const [educationLevel, setEducationLevel] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
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
        post,
    } = useScholar();

    useEffect(() => {
        if (!isAuthenticated || (user.roleId !== 1 && user.roleId !== 2)) {
            navigate('*');
        }

        return () => {
            setErrors(null);
        }
    }, [isAuthenticated, user, navigate, setErrors]);

    const onSubmit = handleSubmit(async (values) => {
        const data = {
            name: values.name,
            firstLastName: values.firstLastName,
            secondLastName: values.secondLastName,
            curp: values.curp,
            birthdate: values.birthdate,
            educationLevel: educationLevel,
            scholarshipId: scholarship,
            tutorId: Number(values.tutorId),
        }

        await post(data, token);
        if (scholar.curp === data.curp) {
            navigate('/admin/scholars');
        }
    });

    return (
        <>
            <Container component={"main"} maxWidth={"md"} sx={{mt: 8}}>
                <Box sx={{padding: 4, marginTop: 4}}>
                    <Typography variant={"h5"} gutterBottom>
                        Add New Scholar
                    </Typography>
                    {
                        ScholarErrors &&
                        <Alert severity={"error"} sx={{mb: 2}}>
                            {ScholarErrors}
                        </Alert>
                    }
                    <form onSubmit={onSubmit}>
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"name"}
                            label={"Name"}
                            name={"name"}
                            autoComplete={"name"}
                            sx={{mt: 2}}
                            {...register('name', {required: true})}
                        />
                        {
                            errors.name &&
                            <Typography variant={"body2"} color={"error"}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"firstLastName"}
                            label={"First Last Name"}
                            name={"lastname"}
                            autoComplete={"lastname"}
                            sx={{mt: 2}}
                            {...register('firstLastName', {required: true})}
                        />
                        {
                            errors.firstLastName &&
                            <Typography variant={"body2"} color={"error"}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"secondLastName"}
                            label={"Second Last Name"}
                            name={"secondlastname"}
                            autoComplete={"secondlastname"}
                            sx={{mt: 2}}
                            {...register('secondLastName')}
                        />

                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"tutorId"}
                            label={"Tutor Code"}
                            name={"tutorId"}
                            autoComplete={"tutorId"}
                            type={"number"}
                            sx={{mt: 2}}
                            {...register('tutorId', {required: true})}
                        />
                        {
                            errors.tutorId &&
                            <Typography variant={"body2"} color={"error"}>
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
                            sx={{mt: 2}}
                            {...register('curp', {required: true})}
                        />
                        {
                            errors.curp &&
                            <Typography variant={"body2"} color={"error"}>
                                This field is required
                            </Typography>
                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"birthdate"}
                            label={"Birthdate"}
                            name={"birthdate"}
                            autoComplete={"birthdate"}
                            type={"date"}
                            InputLabelProps={{shrink: true}}
                            sx={{mt: 2}}
                            {...register('birthdate', {required: true})}
                        />
                        {
                            errors.birthdate &&
                            <Typography variant={"body2"} color={"error"}>
                                This field is required
                            </Typography>
                        }
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <InputLabel id="educationLevel-label">Education Level</InputLabel>
                            <Select
                                labelId="educationLevel-label"
                                id="educationLevel"
                                {...register('educationLevel', {required: true})}
                                value={educationLevel}
                                onChange={(e) => setEducationLevel(e.target.value)}
                                label="Education Level"
                            >
                                <MenuItem value={1}>Primary</MenuItem>
                                <MenuItem value={2}>Secondary</MenuItem>
                                <MenuItem value={3}>High School</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            errors.educationLevel &&
                            <Typography variant={"body2"} color={"error"} sx={{mt: 1}}>
                                This field is required
                            </Typography>
                        }
                        <FormControl sx={{mt: 2}} fullWidth>
                            <InputLabel id={"scholarshipId"}>
                                Scholarship
                            </InputLabel>
                            <Select
                                labelId={"scholarshipId-label"}
                                id={"scholarshipId"}
                                {...register('scholarshipId')}
                                value={scholarship}
                                onChange={(e) => setScholarship(e.target.value)}
                                label={"Scholarship"}
                            >
                                <MenuItem value={1}>Scholarship 1</MenuItem>
                                <MenuItem value={2}>Scholarship 2</MenuItem>
                                <MenuItem value={3}>Scholarship 3</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Centrar botón */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button type={"submit"} variant={"contained"}>
                                Save
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Container>
        </>
    );
}

export default CreateScholar;