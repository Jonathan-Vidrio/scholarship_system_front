import { useAuthentication } from "../../../context/AuthenticationContext.jsx";
import { useScholarship } from "../../../context/ScholarshipContext.jsx";
import { Box, Button, Container, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TableContent from "../../../components/TableContent.jsx";
import { useEffect, useState } from "react";

const IndexScholarships = () => {
    const navigate = useNavigate();

    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const {
              user,
              token,
              isAuthenticated,
          } = useAuthentication();

    const {
              scholarships,
              getAll,
              getDisabled,
              errors: ScholarshipErrors,
              setErrors,
          } = useScholarship();

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
                    setFilteredScholarships(scholarships);
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
        const filteredData = scholarships.filter(scholarship => scholarship.name.toLowerCase()
                                                                           .includes(searchTerm) || scholarship.description.toLowerCase()
                                                                                                               .includes(searchTerm));
        setFilteredScholarships(filteredData);
    }

    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = async (filter) => {
        if (filter === "disabled") {
            try {
                const disabledScholarships = await getDisabled(token);
                setFilteredScholarships(disabledScholarships);
                setIsDataLoaded(true);
            }
            catch (error) {
                setErrors(error.message || "Undefined error");
            }
        }
        else if (filter === "enabled") {
            try {
                const enabledScholarships = await getAll(token);
                setFilteredScholarships(enabledScholarships);
                setIsDataLoaded(true);
            }
            catch (error) {
                setErrors(error.message || "Undefined error");
            }
        }
        handleFilterClose();
    }

    const handleCreate = () => {
        navigate("/admin/scholarships/create");
    }

    const handleDetails = (id) => {
        navigate(`/admin/scholarships/details/${id}`);
    }

    const columns = [
        {
            title: "Name",
            field: "name",
        },
        {
            title: "Description",
            field: "description",
        },
        {
            title: "Amount",
            field: "amount",
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
                                Scholarships
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
                            data={filteredScholarships.length > 0 ? filteredScholarships : scholarships}
                            onDetails={handleDetails}
                        />
                    </>
                )}
            </Container>
        </>
    );
}

export default IndexScholarships;
