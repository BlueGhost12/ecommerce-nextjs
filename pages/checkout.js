import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Fab,
    FormControl,
    FormHelperText,
    Input,
    InputLabel,
    makeStyles,
    OutlinedInput,
    TextField,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import { DataContext } from '../Components/DataContext';
import axios from 'axios';
import { server } from '../Config';
import { useRouter } from 'next/router';
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 600,
    },
    field: {
        margin: theme.spacing(1),
    },
    text: {
        marginLeft: '0.6rem',
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

const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    address: '',
};

const validate = (values) => {
    const required = 'Required';
    let errors = {};
    if (!values.firstName) {
        errors.firstName = required;
    }
    if (!values.lastName) {
        errors.lastName = required;
    }
    if (values.phoneNumber && !/^01[0-9]{9}$/.test(values.phoneNumber)) {
        errors.phoneNumber = 'Invalid Phone Number';
    } else if (!values.phoneNumber) {
        errors.phoneNumber = required;
    }
    if (!values.address) {
        errors.address = required;
    }
    return errors;
};

const Checkout = () => {
    const classes = useStyles();
    const router = useRouter();
    const dataContext = useContext(DataContext);
    const { cart, subtotalCost, tax, totalCost } = dataContext;

    function getDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;
        return today;
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values) => {
            const invoice = {
                invoiceId: null,
                billTo: {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    phoneNumber: values.phoneNumber,
                    address: values.address,
                },
                itemsPurchased: cart,
                subtotalCost,
                tax,
                totalCost,
                date: getDate(),
                isDelivered: true,
            };
            const result = await axios({
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                url: `${server}/api/invoices`,
                data: JSON.stringify(invoice),
            });
            console.log('Invoice created!');
            router
                .push(
                    `/orderDetails/${encodeURIComponent(result.data.invoiceId)}`
                )
                .then();
        },
        validate,
    });

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    color="textSecondary"
                    gutterBottom
                    className={classes.text}
                    variant="h5"
                >
                    Personal Information
                </Typography>
                <form
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        label="First Name"
                        id="firstName"
                        placeholder="First Name"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.field}
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={!!formik.errors.firstName}
                        helperText={formik.errors.firstName}
                    />
                    <TextField
                        label="Last Name"
                        id="lastName"
                        placeholder="Last Name"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.field}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={!!formik.errors.lastName}
                        helperText={formik.errors.lastName}
                    />
                    <TextField
                        label="Phone Number"
                        id="phoneNumber"
                        placeholder="Phone Number"
                        variant="outlined"
                        size="small"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.field}
                        fullWidth
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        error={!!formik.errors.phoneNumber}
                        helperText={formik.errors.phoneNumber}
                    />
                    <TextField
                        error={!!formik.errors.address}
                        helperText={formik.errors.address}
                        label="Address"
                        id="address"
                        placeholder="Address"
                        variant="outlined"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        className={classes.field}
                        fullWidth
                        multiline
                        rows={4}
                        size="small"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                    />
                    <div className={classes.buttonSection}>
                        <Fab
                            variant="extended"
                            size="small"
                            aria-label="add"
                            className={classes.checkoutButton}
                            type="submit"
                        >
                            <DoneOutlineIcon className={classes.extendedIcon} />
                            Proceed to Checkout
                        </Fab>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default Checkout;
