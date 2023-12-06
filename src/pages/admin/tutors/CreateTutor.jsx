import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuthentication } from "../../../context/AuthenticationContext.jsx"
import { useTutor } from "../../../context/TutorContext.jsx"
import { useEffect } from "react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"

const CreateTutor = () => {
    const navigate = useNavigate();

    const {
              register,
              handleSubmit,
              formState: { errors },
          } = useForm();

    const {
              user,
              token,
              isAuthenticated,
          } = useAuthentication();

    const {
              tutor,
              post,
              errors: TutorErrors,
              setErrors,
          } = useTutor();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("*")
        }
        else if (user.roleId !== 1 && user.roleId !== 2) {
            navigate("*")
        }

        return () => {
            setErrors(null);
        }
    }, [
        tutor,
        isAuthenticated,
        setErrors,
    ]);

    const onSubmit = async (values) => {
        const data = {
            workerId:       values.workerId,
            name:           values.name,
            firstLastName:  values.firstLastName,
            secondLastName: values.secondLastName,
            curp:           values.curp,
        }

        post(data, token)
            .then(() => {
                navigate("/admin/tutors");
            })
            .catch((error) => {
                setErrors(error.message || "Undefined error");
            });
    }

    const handleCancel = () => {
        navigate("/admin/tutors");
    }

    return (
        <>
            <Container component={"main"} maxWidth={"md"}>
                <Box sx={{ mt: 12 }}>
                    <Typography variant={"h5"} gutterBottom>
                        Create Tutor
                    </Typography>
                    {TutorErrors && (
                        <Typography variant={"body1"} gutterBottom sx={{ color: "red" }}>
                            {TutorErrors}
                        </Typography>
                    )}
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("workerId", {
                            required:  "WorkerId is required",
                            minLength: {
                                value:   8,
                                message: "WorkerId must be at least 8 characters long",
                            },
                            maxLength: {
                                value:   8,
                                message: "WorkerId must be at most 8 characters long",
                            },
                        })}
                        label={"WorkerId"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.workerId}
                        helperText={errors.workerId?.message}
                    />
                    <TextField
                        {...register("name", {
                            required: "Name is required",
                        })}
                        label={"Name"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        {...register("firstLastName", {
                            required: "First Last Name is required",
                        })}
                        label={"First Last Name"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.firstLastName}
                        helperText={errors.firstLastName?.message}
                    />
                    <TextField
                        {...register("secondLastName", {
                            required: "Second Last Name is required",
                        })}
                        label={"Second Last Name"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.secondLastName}
                        helperText={errors.secondLastName?.message}
                    />
                    <TextField
                        {...register("curp", {
                            required:  "CURP is required",
                            minLength: {
                                value:   18,
                                message: "CURP must be at least 18 characters long",
                            },
                            maxLength: {
                                value:   18,
                                message: "CURP must be at most 18 characters long",
                            },
                        })}
                        label={"CURP"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.curp}
                        helperText={errors.curp?.message}
                    />
                    <Box sx={{
                        display:        "flex",
                        justifyContent: "space-between",
                        mt:             2,
                    }}>
                        <Button
                            variant={"contained"}
                            color={"error"}
                            fullWidth
                            sx={{ mr: 2 }}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth
                            sx={{ ml: 2 }}
                        >
                            Save
                        </Button>
                    </Box>
                </form>
            </Container>
        </>
    );
}

export default CreateTutor;