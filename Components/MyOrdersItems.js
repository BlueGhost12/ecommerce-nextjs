import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
    paper: {
        maxWidth: 400,
        margin: `${theme.spacing(1)}px auto`,
        padding: theme.spacing(2),
    },
}));

const MyOrdersItem = ({ invoice }) => {
    const classes = useStyles();
    return (
        <Link href={`/orderDetails/${encodeURIComponent(invoice.invoiceId)}`}>
            <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Typography variant="caption" display="inline">
                            Order ID:{' '}
                        </Typography>
                        <Typography display="inline">
                            {invoice.invoiceId}
                        </Typography>
                    </Grid>
                    <Grid item xs style={{ marginLeft: 'auto' }}>
                        <Typography variant="caption" display="inline">
                            Issued on:{' '}
                        </Typography>
                        <Typography noWrap display="inline">
                            {invoice.date}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Link>
    );
};

export default MyOrdersItem;
