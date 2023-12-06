import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuthentication } from "../../../context/AuthenticationContext.jsx";
import { useScholarship } from "../../../context/ScholarshipContext.jsx";
import { useEffect, useState } from "react";
import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";

const EditScholarship = () => {
    const { id } = useParams();

    const navigate = useNavigate();

    const [isDataLoaded, setIsDataLoaded] = useState(false);

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
              put,
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
                    setIsDataLoaded(true);
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
        isAuthenticated,
    ]);

    const onSubmit = async (values) => {
        setErrors(null);

        const data = {
            name:        values.name,
            description: values.description,
            amount:      Number(values.amount),
        }

        put(id, data, token)
            .then(() => {
                navigate("/admin/scholarships");
            })
            .catch((error) => {
                setErrors(error.message || "Ocurrió un error desconocido.");
            });
    }

    const handleCancel = () => {
        navigate("/admin/scholarships");
    }

    return (
        <>
            <Container component={"main"} maxWidth={"md"} sx={{ mt: 8 }}>
                <Box sx={{
                    marginTop:      12,
                    display:        "flex",
                    justifyContent: "space-between",
                }}>
                    <Typography component={"h1"} variant={"h5"}>
                        Edit Scholarship "{scholarship ? scholarship.name : "..."}"
                    </Typography>
                </Box>
                {ScholarshipErrors && (
                    <Alert severity={"error"} sx={{
                        mt: 2,
                        mb: 2,
                    }}>
                        {ScholarshipErrors}
                    </Alert>
                )}
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        {...register("description", {
                            required: "Description is required",
                        })}
                        label={"Description"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
                        InputLabelProps={{
                            shrink: true,
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
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Box>
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

export default EditScholarship;