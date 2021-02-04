import React from 'react';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    makeStyles,
    TableCell,
    TableRow,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Link from 'next/link';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
    image: {
        height: '4rem',
        // width: '5rem',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    },
});

const InvoiceProductItems = ({ item }) => {
    const classes = useStyles();
    return (
        <TableRow key={item.id}>
            <TableCell align="center">
                <img
                    className={classes.image}
                    src={item.picture}
                    alt={item.title}
                />
            </TableCell>
            <TableCell component="th" scope="row" align="left">
                {item.title}
            </TableCell>
            <TableCell align="center">${item.price}</TableCell>
            <TableCell align="center">{item.instance}</TableCell>
            <TableCell align="center">${item.subtotal}</TableCell>
        </TableRow>
    );
};

export default InvoiceProductItems;
