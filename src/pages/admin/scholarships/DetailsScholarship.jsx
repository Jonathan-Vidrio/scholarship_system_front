import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAuthentication } from "../../../context/AuthenticationContext.jsx";
import { useScholarship } from "../../../context/ScholarshipContext.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Edit, ToggleOff, ToggleOn } from "@mui/icons-material";

const DetailsScholarship = message => {
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
              scholarship,
              getById,
              disable,
              enable,
              errors: ScholarshipErrors,
              setErrors,
          } = useScholarship();

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
                    setValue("name", scholarship.name);
                    setValue("description", scholarship.description);
                    setValue("amount", scholarship.amount);
                    if (scholarship.statusId === 0) {
                        setIsDisabled(true);
                    }
                    else if (scholarship.statusId === 1) {
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
        scholarship,
        isAuthenticated,
    ]);

    const handleCancel = () => {
        navigate("/admin/scholarships");
    }

    const handleEdit = () => {
        navigate(`/admin/scholarships/edit/${id}`);
    }

    const handleDelete = () => {
        if (!isDisabled) {
            const isConfirmed = confirm("Are you sure you want to disable this scholarship?", "Disable Scholarship")
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
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100vh",
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
                                Details Scholarship "{scholarship ? scholarship.name : "..."}"
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
                        {ScholarshipErrors && (
                            <Alert severity={"error"} sx={{
                                mt: 2,
                                mb: 2,
                            }}>
                                {ScholarshipErrors}
                            </Alert>
                        )}
                        <form>
                            <TextField
                                {...register("name", {
                                    required: "Name is required",
                                })}
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
                                {...register("description", {
                                    required: "Description is required",
                                })}
                                label={"Description"}
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
                            <Box sx={{
                                display:        "flex",
                                justifyContent: "space-between",
                            }}>
                                <TextField
                                    variant={"outlined"}
                                    margin={"normal"}
                                    label={"$MXN"}
                                    disabled
                                    sx={{
                                        mr:    1,
                                        width: "10%",
                                    }}
                                />
                                <TextField
                                    {...register("amount", {
                                        required: "Amount is required",
                                    })}
                                    label={"Amount"}
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
                            </Box>
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
                        </form>
                    </>
                )}
            </Container>
        </>
    );
}

export default DetailsScholarship;