import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthentication } from "../../../context/AuthenticationContext.jsx";
import { useTutor } from "../../../context/TutorContext.jsx";
import { Box, Button, Container, Menu, MenuItem, TextField, Typography } from "@mui/material"
import { Add, FilterList } from "@mui/icons-material"
import TableContent from "../../../components/TableContent.jsx"

const IndexTutors = () => {
    const navigate = useNavigate();

    const [filteredTutors, setFilteredTutors] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const {
              user,
              token,
              isAuthenticated,
          } = useAuthentication();

    const {
              tutors,
              getAll,
              getDisabled,
              errors: TutorErrors,
              setErrors,
          } = useTutor();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
        else if (user.roleId !== 1 && user.roleId !== 2) {
            navigate("/login");
        }
        else {
            getAll(token)
                .then(() => {
                    setFilteredTutors(tutors);
                    setIsDataLoaded(true);
                })
                .catch((error) => {
                    setErrors(error.message || "Ocurrió un error desconocido.");
                });
        }

        return () => {
            setErrors(null);
        }
    }, [
        token,
        setErrors,
        isAuthenticated,
        isDataLoaded,
        user,
    ]);

    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredData = tutors.filter((tutor) => {
            const name = `${tutor.name} ${tutor.firstLastName} ${tutor.secondLastName}`;
            return name.toLowerCase()
                       .includes(searchTerm) ||
                tutor.curp.toLowerCase()
                     .includes(searchTerm) ||
                tutor.workerId.toLowerCase()
                     .includes(searchTerm);
        });
        setFilteredTutors(filteredData);
    }

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleFilterClose = () => {
        setAnchorEl(null);
    }

    const handleFilterSelect = async (filter) => {
        if (filter === "disabled") {
            try {
                const disabledTutors = await getDisabled(token);
                setFilteredTutors(disabledTutors);
                setIsDataLoaded(true);
            }
            catch (error) {
                setErrors(error.message || "Ocurrió un error desconocido.");
            }
        }
        else if (filter === "enabled") {
            try {
                const enabledTutors = await getAll(token);
                setFilteredTutors(enabledTutors);
                setIsDataLoaded(true);
            }
            catch (error) {
                setErrors(error.message || "Ocurrió un error desconocido.");
            }
        }
        handleFilterClose();
    }

    const handleCreate = () => {
        navigate("/admin/tutors/create");
    }

    const handleDetails = (id) => {
        navigate(`/admin/tutors/details/${id}`);
    }

    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "First Last Name",
            field: "firstLastName",
        },
        {
            title: "Second Last Name",
            field: "secondLastName",
        },
        {
            title: "WorkerId",
            field: "workerId",
        },
        {
            title: "CURP",
            field: "curp",
        },
    ];

    return (
        <>
            <Container component={"main"} maxWidth={"lg"}>
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
                            mt:             12,
                            mb:             2,
                            display:        "flex",
                            justifyContent: "space-between",
                            alignItems:     "center",
                        }}>
                            <Typography component={"h1"} variant={"h5"} sx={{ mr: 4 }}>
                                Tutors
                            </Typography>
                            <TextField
                                id="search-bar"
                                variant="outlined"
                                label="Search"
                                type="search"
                                size="small"
                                onChange={handleSearch}
                                sx={{ width: "70%" }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleCreate}
                                sx={{ ml: 1 }}
                            >
                                <Add/>
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={handleFilterClick}
                                sx={{ ml: 1 }}
                            >
                                <FilterList/>
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleFilterClose}
                                anchorOrigin={{
                                    vertical:   "bottom",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical:   "top",
                                    horizontal: "right",
                                }}
                                PaperProps={{
                                    style: {
                                        width: "250px",
                                    },
                                }}
                                sx={{ mt: 1 }}
                            >
                                <MenuItem onClick={() => handleFilterSelect("disabled")}>Disabled</MenuItem>
                                <MenuItem onClick={() => handleFilterSelect("enabled")}>Enabled</MenuItem>
                            </Menu>
                        </Box>
                        <TableContent
                            columns={columns}
                            data={filteredTutors.length > 0 ? filteredTutors : tutors}
                            onDetails={handleDetails}
                        />
                    </>
                )}
            </Container>
        </>
    );
}

export default IndexTutors;