import {useContext, useEffect, useState} from "react";
import {ScholarContext} from "../../../context/ScholarContext.jsx";
import {
    Box, Button,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow, TextField,
    Typography
} from "@mui/material";
import {useAuthentication} from "../../../context/AuthenticationContext.jsx";
import {useNavigate} from "react-router-dom";
import {Add, Edit, FeaturedPlayList} from "@mui/icons-material";

const IndexScholars = () => {
    const {
        scholars,
        getAll
    } = useContext(ScholarContext);

    const {
        user,
        token,
        isAuthenticated
    } = useAuthentication();

    const navigate = useNavigate();

    const columns = [
        {title: 'Full Name', field: 'fullName', render: (rowData) => `${rowData.name} ${rowData.firstLastName} ${rowData.secondLastName}`},
        {title: 'CURP', field: 'curp',},
        {title: 'Tutor', field: 'tutorId',},
        {title: 'Education Level', field: 'educationLevelId',},
        {title: 'Scholarship', field: 'scholarshipId',}
    ];

    const modifiedColumns = [
        {
            title: 'Actions',
            field: 'actions',
            render: (rowData) => (
                <Box>
                    <Button onClick={() => handleDetails(rowData.id)}>
                        <FeaturedPlayList />
                    </Button>
                    <Button onClick={() => handleEdit(rowData.id)}>
                        <Edit />
                    </Button>
                </Box>
            ),
        },
        ...columns
    ];

    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setPage(0);
    };

    const handleAddNewRecord = () => {
        navigate('/admin/scholars/create');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleDetails = (scholarId) => {
        console.log(`Ver detalles del scholar con ID: ${scholarId}`);
    };

    const handleEdit = (scholarId) => {
        console.log(`Editar scholar con ID: ${scholarId}`);
    };

    const filteredScholars = searchQuery
        ? scholars.filter((scholar) =>
            Object.values(scholar).some((value) =>
                String(value).toLowerCase().includes(searchQuery)
            )
        )
        : scholars;

    const rowsToDisplay = filteredScholars.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    useEffect(() => {
        if (!isAuthenticated || (user.roleId === 2 || user.roleId === 3)) {
            navigate('*');
        } else {
            getAll(token);
        }
    }, [isAuthenticated, user]);

    return (
        <>
            <Container component="main" sx={{mt: 8}}>
                <Box sx={{padding: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography component="h1" variant="h5">
                        Scholars
                    </Typography>
                    <TextField
                        id="search-bar"
                        variant="outlined"
                        label="Search"
                        type="search"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        sx={{width: '50%'}}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Add />}
                        onClick={handleAddNewRecord}
                    >
                        Add New
                    </Button>
                </Box>
                    <TableContainer>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {modifiedColumns.map((column) => (
                                        <TableCell
                                            key={column.field}
                                            align={column.align || 'center'}
                                            style={{minWidth: column.minWidth}}
                                        >
                                            {column.title}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rowsToDisplay.map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            {modifiedColumns.map((column) => {
                                                const value = row[column.field];
                                                return (
                                                    <TableCell key={column.field} align={column.align || 'center'}>
                                                        {column.render ? column.render(row) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={filteredScholars.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
            </Container>
        </>
    );
}

export default IndexScholars;