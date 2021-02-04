import Link from 'next/link';
import React, { useContext } from 'react';
import { makeStyles, TableCell, TableRow } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { DataContext } from './DataContext';

const useStyles = makeStyles({
    image: {
        height: '4rem',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    },
});

const CartItem = ({ item }) => {
    const dataContext = useContext(DataContext);
    const { isProductAvailable, updateCart, removeFromCart } = dataContext;
    const classes = useStyles();
    return (
        <TableRow
            key={item.id}
            m="50px"
            style={{
                marginBottom: '10px',
                marginTop: '10px',
            }}
        >
            <TableCell align="center">
                <IconButton
                    aria-label="share"
                    onClick={() => removeFromCart(item)}
                >
                    <DeleteForeverIcon />
                </IconButton>
            </TableCell>
            <TableCell align="center">
                <img
                    className={classes.image}
                    src={item.picture}
                    alt={item.title}
                />
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                <Link href={`/product/${encodeURIComponent(item.id)}`}>
                    {item.title}
                </Link>
            </TableCell>
            <TableCell align="center">${item.price}</TableCell>
            <TableCell align="center">
                <IconButton
                    aria-label="share"
                    onClick={() => updateCart(item, -1)}
                >
                    <RemoveIcon />
                </IconButton>
                {item.instance}
                <IconButton
                    aria-label="share"
                    onClick={() => updateCart(item, 1)}
                    disabled={!isProductAvailable(item)}
                >
                    <AddIcon />
                </IconButton>
            </TableCell>
            <TableCell align="center">${item.subtotal}</TableCell>
        </TableRow>
    );
};

export default CartItem;
