import React from "react";
import {
    Container,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper
} from "@material-ui/core";

const NameList = ({ names }) => {
    return(
        <div>
        <Container maxWidth="md">
                <TableContainer component={Paper} com>
                    <Table size="small">
                        <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Amount</TableCell>
                                </TableRow>
                        </TableHead>
                        <TableBody>
                            {names.map ((name) =>
                            <TableRow key={name.name}>
                                <TableCell>{name.name}</TableCell>
                                <TableCell>{name.amount}</TableCell>
                            </TableRow>)}
                        </TableBody>
                    </Table>
                </TableContainer>
         </Container>
        </div>
    )
}

export default NameList;