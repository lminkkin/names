import React, { useState } from "react";
import {
    Container,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableSortLabel,
    TablePagination,
    Paper
} from "@material-ui/core";

const NameList = ({ names }) => {

    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();
    const pages = [5, 10, 20];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])

    const headCells = [
        {id: "name", label: "First Name"},
        {id: "amount", label: "Amount"}
    ]

    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order  === "asc";
        setOrder(isAsc ? "desc" : "asc")
        setOrderBy(cellId)
    }
    
    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);

    }

    const getComparator = (order, orderBy) => {
        return order === "desc" 
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    const descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }

        return 0;
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0)
    }

    const afterSort = () => {
        return stableSort(names, getComparator(order, orderBy)).slice(page * rowsPerPage, (page+1)*rowsPerPage)
        
    }

    return(
        <div>
            <Container>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                    <TableRow>
                                    {headCells.map((headCell) => (
                                        <TableCell  key={headCell.id}
                                                    sortDirection={orderBy === headCell.id ? order: false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === headCell.id}
                                                direction = {orderBy === headCell.id ? order: "asc"}
                                                onClick = {() => {handleSortRequest(headCell.id)}}

                                            >
                                                {headCell.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    ))}
                                    <TableCell>Sum: {names.map((item) => item.amount).reduce((curr, acc) => curr + acc, 0)}</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                {afterSort().map((name) =>
                                <TableRow key={name._id}>
                                    <TableCell>{name.name}</TableCell>
                                    <TableCell>{name.amount}</TableCell>
                                    <TableCell></TableCell> 
                                </TableRow>)}
                                <TableRow>
                                
                                </TableRow>
                            </TableBody>
                        </Table>
                        <TablePagination
                            page={page}
                            rowsPerPageOptions={pages}
                            rowsPerPage={rowsPerPage}
                            count={names.length}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}

                        />
                    </TableContainer>
         </Container>
        </div>
    )
}

export default NameList;