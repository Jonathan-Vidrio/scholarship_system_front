import { Alert, Box, Button, Container, TextField, Typography } from "@mui/material";
import { useAuthentication } from "../../../context/AuthenticationContext.jsx";
import { useScholarship } from "../../../context/ScholarshipContext.jsx";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreateScholarship = () => {
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
              scholarship,
              post,
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

        return () => {
            setErrors(null);
        }
    }, [
        scholarship,
        isAuthenticated,
        setErrors,
    ]);

    const onSubmit = async (values) => {
        const data = {
            name:        values.name,
            description: values.description,
            amount:      Number(values.amount),
        }

        post(data, token)
            .then(() => {
                navigate("/admin/scholarships");
            })
            .catch((error) => {
                setErrors(error.message || "Undefined error");
            });
    }

    const handleCancel = () => {
        navigate("/admin/scholarships");
    }

    return (
        <>
            <Container component={"main"} maxWidth={"md"} sx={{ mt: 8 }}>
                <Box sx={{ marginTop: 12 }}>
                    <Typography variant={"h5"} gutterBottom>
                        Add New Scholarship
                    </Typography>
                    {ScholarshipErrors && (
                        <Alert severity={"error"} sx={{
                            mt: 2,
                            mb: 2,
                        }}>
                            {ScholarshipErrors}
                        </Alert>
                    )}
                </Box>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        {...register("name", {
                            required: 'Name is required',
                        })}
                        label={"Name"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        {...register("description", {
                            required: 'Description is required',
                        })}
                        label={"Description"}
                        margin={"normal"}
                        variant={"outlined"}
                        fullWidth
                        error={!!errors.description}
                        helperText={errors.description?.message}
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
                                required: 'Amount is required' })}
                            label={"Amount"}
                            margin={"normal"}
                            variant={"outlined"}
                            fullWidth
                            error={!!errors.amount}
                            helperText={errors.amount?.message}
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

export default CreateScholarship;