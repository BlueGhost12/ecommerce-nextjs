import React, { useContext } from 'react';
import { DataContext } from '../Components/DataContext';
import {
    Grid,
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
import Link from 'next/link';

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
            <Grid container xs={12}>
                <TableContainer
                    component={Paper}
                    style={{ margin: '1rem 2rem' }}
                >
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
            </Grid>
            <CartFooter />
        </>
    ) : (
        <Typography
            align={'center'}
            variant="h3"
            gutterBottom
            className={classes.emptyCart}
            style={{ marginTop: '4rem' }}
        >
            Your cart is empty. Shop for items{' '}
            <Link href="/">
                <span style={{ color: 'blue', cursor: 'pointer' }}>here.</span>
            </Link>{' '}
        </Typography>
    );
};

export default Cart;
