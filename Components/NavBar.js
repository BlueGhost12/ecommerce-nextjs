import React, { useContext } from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Badge } from '@material-ui/core';
import { DataContext } from './DataContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const NavBar = (props) => {
    const dataContext = useContext(DataContext);
    const { cartItemQuantity } = dataContext;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="sticky">
                <Toolbar>
                    <Link href="/">
                        <IconButton color="inherit">
                            <StorefrontIcon />
                        </IconButton>
                    </Link>
                    <Typography variant="h6" className={classes.title}>
                        <Link href="/">Shopee</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.menuButton}>
                        <Link href="/checkout">Checkout</Link>
                    </Typography>
                    <Typography variant="h6" className={classes.menuButton}>
                        <Link href="/myorders">My Orders</Link>
                    </Typography>
                    <Link href="/cart">
                        <IconButton
                            color="inherit"
                            className={classes.menuButton}
                        >
                            <Badge
                                badgeContent={cartItemQuantity}
                                color="secondary"
                            >
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                    </Link>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;
