import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import { FeaturedPlayList } from "@mui/icons-material";

const TableContent = ({
                          columns,
                          data,
                          initialPerRowsPage = 10,
                          onDetails,
                      }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(initialPerRowsPage);

    const modifiedColumns = [
        {
            title:  "Actions",
            field:  "actions",
            render: (row) => (
                <Box>
                    <Button onClick={() => onDetails(row.id)}>
                        <FeaturedPlayList/>
                    </Button>
                </Box>
            ),
            width:  "10%",
        },
        ...columns,
    ];

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rowsToDisplay = data ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : [];

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        {modifiedColumns.map((column) => (
                            <TableCell
                                key={column.field}
                                align={column.align || "center"}
                                style={{
                                    minWidth: column.minWidth,
                                    width:    column.width,
                                }}
                            >
                                {column.title}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowsToDisplay.map((row) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {modifiedColumns.map((column) => {
                                const value = row[column.field];
                                return (
                                    <TableCell key={column.field} align={column.align || "center"}>
                                        {column.render ? column.render(row) : value}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[
                    5,
                    10,
                    25,
                ]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default TableContent;