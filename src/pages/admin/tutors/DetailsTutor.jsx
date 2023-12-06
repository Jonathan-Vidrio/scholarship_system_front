import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useAuthentication } from "../../../context/AuthenticationContext.jsx"
import { useTutor } from "../../../context/TutorContext.jsx"
import { useEffect, useState } from "react"
import { Box, Button, Container, TextField, Typography } from "@mui/material"
import { Edit, ToggleOff, ToggleOn } from "@mui/icons-material"

const DetailsTutor = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const {
              register,
              handleSubmit,
              setValue,
              formState: { errors },
          } = useForm();

    const {
              user,
              token,
              isAuthenticated,
          } = useAuthentication();

    const {
              tutor,
              getById,
              enable,
              disable,
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
        else {
            getById(id, token)
                .then(() => {
                    setValue("workerId", tutor.workerId);
                    setValue("name", tutor.name);
                    setValue("firstLastName", tutor.firstLastName);
                    setValue("secondLastName", tutor.secondLastName);
                    setValue("curp", tutor.curp);
                    if (tutor.statusId === 0) {
                        setIsDisabled(true);
                    }
                    else if (tutor.statusId === 1) {
                        setIsDisabled(false);
                    }
                    setTimeout(() => {
                        setIsDataLoaded(true);
                    }, 300);
                })
                .catch((error) => {
                    setErrors(error.message || "Undefined error");
                });
        }

        return () => {
            setErrors(null);
        }
    }, [
        id,
        tutor,
        isAuthenticated,
    ]);

    const handleCancel = () => {
        navigate("/admin/tutors");
    }

    const handleEdit = () => {
        navigate(`/admin/tutors/edit/${id}`);
    }

    const handleDelete = () => {
        if (!isDisabled) {
            const isConfirmed = window.confirm("Are you sure you want to disable this tutor?");
            if (isConfirmed) {
                disable(id, token)
                    .then(() => {
                        setIsDisabled(true);
                    })
                    .catch((error) => {
                        setErrors(error.message || "Undefined error");
                    });
            }
        }
        else {
            enable(id, token)
                .then(() => {
                    setIsDisabled(false);
                })
                .catch((error) => {
                    setErrors(error.message || "Undefined error");
                });
        }
    }

    return (
        <>
            <Container component={"main"} maxWidth={"md"}>
                {!isDataLoaded ? (
                    <Box sx={{
                        display:        "flex",
                        flexDirection:  "column",
                        alignItems:     "center",
                        justifyContent: "center",
                        height:         "100vh",
                    }}>
                        <Typography variant={"h5"}>
                            Loading...
                        </Typography>
                    </Box>
                ) : (
                    <>
                        <Box sx={{
                            marginTop:      12,
                            display:        "flex",
                            justifyContent: "space-between",
                        }}>
                            <Typography component={"h1"} variant={"h5"}>
                                Details Tutor
                                "{tutor ? `${tutor.name} ${tutor.firstLastName} ${tutor.secondLastName}` : "..."}"
                            </Typography>
                            <Box sx={{
                                display:    "flex",
                                alignItems: "center",
                            }}>
                                <Button variant={"contained"} color={"primary"} onClick={handleEdit} sx={{ mr: 1 }}>
                                    <Edit/>
                                </Button>
                                {!isDisabled ? (
                                    <Button variant={"contained"} color={"secondary"} onClick={handleDelete}>
                                        <ToggleOn/>
                                    </Button>
                                ) : (
                                    <Button variant={"contained"} color={"error"} onClick={handleDelete}>
                                        <ToggleOff/>
                                    </Button>
                                )}
                            </Box>
                        </Box>
                        {TutorErrors && (
                            <Typography variant={"body1"} gutterBottom sx={{ color: "red" }}>
                                {TutorErrors}
                            </Typography>
                        )}
                        <form>
                            <TextField
                                {...register("workerId")}
                                label={"WorkerId"}
                                margin={"normal"}
                                variant={"outlined"}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style:    {
                                        color:    "black",
                                        fontSize: "1rem",
                                    },
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                {...register("name")}
                                label={"Name"}
                                margin={"normal"}
                                variant={"outlined"}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style:    {
                                        color:    "black",
                                        fontSize: "1rem",
                                    },
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                {...register("firstLastName")}
                                label={"First Last Name"}
                                margin={"normal"}
                                variant={"outlined"}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style:    {
                                        color:    "black",
                                        fontSize: "1rem",
                                    },
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                {...register("secondLastName")}
                                label={"Second Last Name"}
                                margin={"normal"}
                                variant={"outlined"}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style:    {
                                        color:    "black",
                                        fontSize: "1rem",
                                    },
                                    readOnly: true,
                                }}
                            />
                            <TextField
                                {...register("curp")}
                                label={"CURP"}
                                margin={"normal"}
                                variant={"outlined"}
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    style:    {
                                        color:    "black",
                                        fontSize: "1rem",
                                    },
                                    readOnly: true,
                                }}
                            />
                        </form>
                        <Box sx={{
                            display:        "flex",
                            justifyContent: "center",
                            mt:             2,
                        }}>
                            <Button
                                variant={"contained"}
                                color={"primary"}
                                sx={{ width: "50%" }}
                                onClick={handleCancel}
                            >
                                Return
                            </Button>
                        </Box>
                    </>
                )}
            </Container>
        </>
    );
}

export default DetailsTutor;