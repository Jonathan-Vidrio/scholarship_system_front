import {Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useForm} from "react-hook-form";
import {useAuthentication} from "../../../context/AuthenticationContext.jsx";
import {useScholar} from "../../../context/ScholarContext.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

const CreateScholar = () => {
    const navigate = useNavigate();

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
        scholars,
        errors: ScholarErrors,
        setErrors,
        post,
    } = useScholar();

    useEffect(() => {
        if (!isAuthenticated || user.roleId !== 2 || user.roleId !== 1) {
            navigate('*');
        } else {

        }
    }, [isAuthenticated, user, navigate]);

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <>
            <Container component={"main"} maxWidth={"md"} sx={{mt: 8}}>
                <Box sx={{padding: 4, marginTop: 4}}>
                    <Typography variant={"h5"} gutterBottom>
                        Add New Scholar
                    </Typography>
                    {

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
                            sx={{mb: 2}}
                        />
                        {

                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"firstLastName"}
                            label={"First Last Name"}
                            name={"lastname"}
                            autoComplete={"lastname"}
                            sx={{mb: 2}}
                        />
                        {

                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"secondLastName"}
                            label={"Second Last Name"}
                            name={"secondlastname"}
                            autoComplete={"secondlastname"}
                            sx={{mb: 2}}
                        />
                        {
                            
                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"tutorId"}
                            label={"Tutor Code"}
                            name={"tutorId"}
                            autoComplete={"email"}
                            sx={{mb: 2}}
                        />
                        {

                        }
                        <TextField
                            variant={"outlined"}
                            margin={"normal"}
                            fullWidth
                            id={"curp"}
                            label={"CURP"}
                            name={"curp"}
                            autoComplete={"curp"}
                            sx={{mb: 2}}
                        />
                        {

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
                            sx={{mb: 2}}
                        />
                        {

                        }
                        <FormControl sx={{mb: 2}} fullWidth>
                            <InputLabel id={"educationLevelId"}>
                                Education Level
                            </InputLabel>
                            <Select
                                labelId={"educationLevelId"}
                                id={"educationLevelId"}
                                label={"Education Level"}
                                sx={{mb: 2}}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value={1}>Primary</MenuItem>
                                <MenuItem value={2}>Secondary</MenuItem>
                                <MenuItem value={3}>High School</MenuItem>
                            </Select>
                        </FormControl>
                        {

                        }
                        <FormControl sx={{mb: 2}} fullWidth>
                            <InputLabel id={"scholarshipId"}>
                                Scholarship
                            </InputLabel>
                            <Select
                                labelId={"scholarshipId"}
                                id={"scholarshipId"}
                                label={"Scholarship"}
                                sx={{mb: 2}}
                                InputLabelProps={{shrink: true}}
                            >
                                <MenuItem value={1}>Scholarship 1</MenuItem>
                                <MenuItem value={2}>Scholarship 2</MenuItem>
                                <MenuItem value={3}>Scholarship 3</MenuItem>
                            </Select>
                        </FormControl>
                        {

                        }
                        {/* Centrar botón */}
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
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