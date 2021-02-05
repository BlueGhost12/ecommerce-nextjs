import React from 'react';
import Typography from '@material-ui/core/Typography';
import {
    Card,
    CardContent,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';

import InvoiceProductItems from '../../Components/InvoiceProductItems';
import axios from 'axios';
import { server } from '../../Config';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: '1rem auto',
        flexGrow: 1,
        maxWidth: 1000,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(0, 0, 2),
    },
    table: {
        minWidth: 550,
    },
}));

const Invoice = ({
    invoiceId,
    billTo: { firstName, lastName, phoneNumber, address },
    itemsPurchased,
    subtotalCost,
    tax,
    totalCost,
}) => {
    const classes = useStyles();
    return (
        <>
            <Card className={classes.root}>
                <CardContent>
                    <Typography
                        className={classes.title}
                        color="textSecondary"
                        gutterBottom
                    >
                        Invoice ID: {invoiceId}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {`${firstName} ${lastName}`}
                    </Typography>
                    <Typography className={classes.pos} color="p">
                        {phoneNumber}
                    </Typography>
                    <Typography variant="body2" component="p" gutterBottom>
                        {address}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Subtotal: ${subtotalCost}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Tax: ${tax}
                    </Typography>
                    <Typography variant="h5" component="p">
                        Total bill: ${totalCost}
                    </Typography>
                </CardContent>
            </Card>
            <TableContainer component={Paper} className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">QTY</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {itemsPurchased.map((item) => (
                            <InvoiceProductItems key={item.id} item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default Invoice;

export async function getServerSideProps(context) {
    let JSONinvoice = await axios.get(
        `${server}/api/invoices/${encodeURIComponent(context.params.invoiceId)}`
    );
    JSONinvoice = JSONinvoice.data;
    return {
        props: {
            ...JSONinvoice,
        },
    };
}
