import React, { useContext, useEffect } from 'react';
import { Divider, Fab, Grid, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { DataContext } from './DataContext';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
    footerRoot: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        marginLeft: 'auto',
        marginRight: '2rem',
        marginBottom: '2rem',
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    buttonSection: {
        textAlign: 'center',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    checkoutButton: {
        backgroundColor: 'darkseagreen',
    },
}));

const CardFooter = () => {
    const dataContext = useContext(DataContext);
    const { tax, totalCost, subtotalCost, updateCartCost, cart } = dataContext;
    const classes = useStyles();
    const router = useRouter();
    useEffect(() => {
        updateCartCost(cart);
    }, [cart]);

    function handleClick(event) {
        event.preventDefault();
        router.push('/checkout').then();
    }

    return (
        <div className={classes.footerRoot}>
            <div className={classes.section1}>
                <Grid container alignItems="flex-start">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5">
                            Subtotal
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                            ${subtotalCost}
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container alignItems="center">
                    <Grid item xs>
                        <Typography gutterBottom variant="h5">
                            Tax{' '}
                            <Typography variant="body2" display="inline">
                                (10%)
                            </Typography>
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                            ${tax}
                        </Typography>
                    </Grid>
                </Grid>
                <Divider variant="middle" />
                <Grid
                    container
                    alignItems="center"
                    style={{ paddingTop: '0.5rem' }}
                >
                    <Grid item xs>
                        <Typography gutterBottom variant="h5">
                            Total
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography gutterBottom variant="h6">
                            ${totalCost}
                        </Typography>
                    </Grid>
                </Grid>
            </div>
            <div className={classes.buttonSection}>
                <Fab
                    variant="extended"
                    size="small"
                    aria-label="add"
                    className={classes.checkoutButton}
                    onClick={handleClick}
                >
                    <DoneOutlineIcon className={classes.extendedIcon} />
                    Proceed to Checkout
                </Fab>
            </div>
        </div>
    );
};

export default CardFooter;
