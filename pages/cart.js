import React, { useContext } from 'react';
import { DataContext } from '../Components/DataContext';
import {
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@material-ui/core';
import CartItem from '../Components/CartItem';
import CartFooter from '../Components/CartFooter';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    table: {
        minWidth: 550,
    },
    emptyCart: {
        paddingTop: '1rem',
    },
});

const Cart = () => {
    const dataContext = useContext(DataContext);
    const { cart, cartItemQuantity } = dataContext;
    const classes = useStyles();

    return !!cartItemQuantity ? (
        <>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Delete</TableCell>
                            <TableCell align="center">Image</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="center">Price</TableCell>
                            <TableCell align="center">QTY</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cart.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <CartFooter />
        </>
    ) : (
        <Typography
            align={'center'}
            variant="h2"
            gutterBottom
            className={classes.emptyCart}
        >
            Your cart is empty.
        </Typography>
    );
};

export default Cart;
