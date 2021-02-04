import React from 'react';
import axios from 'axios';
import { server } from '../Config';
import { makeStyles } from '@material-ui/core';
import MyOrdersItem from '../Components/MyOrdersItems';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0, 3),
    },
}));

const MyOrders = ({ invoices }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {invoices.map((invoice) => (
                <MyOrdersItem invoice={invoice} />
            ))}
        </div>
    );
};

export default MyOrders;

export async function getServerSideProps(context) {
    let JSONinvoices = await axios.get(`${server}/api/invoices`);
    return {
        props: {
            invoices: JSONinvoices.data,
        },
    };
}
