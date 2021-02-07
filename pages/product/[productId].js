import React, { useContext } from 'react';
import * as path from 'path';
import { Button, Grid, makeStyles, Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { DataContext } from '../../Components/DataContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginTop: '1rem',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1300,
    },
    image: {
        height: '25rem',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    },
    price: {
        color: 'cornflowerblue',
        margin: '1rem 0rem',
    },
    info: {
        margin: '1.2rem 0rem',
    },
    buttons: {
        marginRight: theme.spacing(1),
    },
}));

const ProductDetails = ({ productDetails }) => {
    const dataContext = useContext(DataContext);
    const { addProductToCart, isStockAvailable } = dataContext;
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img
                            className={classes.image}
                            alt="product-image"
                            src={productDetails.picture}
                        />
                    </Grid>
                    <Grid
                        item
                        xs={12}
                        sm
                        container
                        style={{ marginLeft: '2rem' }}
                    >
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="h4">
                                    {productDetails.title}
                                </Typography>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    className={classes.price}
                                >
                                    ${productDetails.price}
                                </Typography>
                                <div className={classes.info}>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Availability : {productDetails.stock}
                                    </Typography>
                                    <Typography
                                        variant="subtitle2"
                                        gutterBottom
                                    >
                                        Product ID : {productDetails.id}
                                    </Typography>
                                </div>
                                <Typography
                                    variant="body1"
                                    color="textSecondary"
                                >
                                    {productDetails.description}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() =>
                                        addProductToCart(productDetails)
                                    }
                                    disabled={isStockAvailable(productDetails.id)}
                                >
                                    <AddShoppingCartIcon
                                        className={classes.buttons}
                                    />
                                    Add to Cart
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
};

export default ProductDetails;

export async function getStaticPaths() {
    let fs = require('fs');
    let rawData = fs
        .readFileSync(path.join(process.cwd(), './public/db.json'))
        .toString();
    let JSONproducts = JSON.parse(rawData);
    const ids = JSONproducts.map((product) => product.id);
    const paths = ids.map((id) => ({ params: { productId: id.toString() } }));
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    let fs = require('fs');
    let rawData = fs
        .readFileSync(path.join(process.cwd(), './public/db.json'))
        .toString();
    let JSONproducts = JSON.parse(rawData);
    const productDetails = JSONproducts.find(
        (product) =>
            product.id.toString() === context.params.productId.toString()
    );
    return {
        props: {
            productDetails,
        },
    };
}
