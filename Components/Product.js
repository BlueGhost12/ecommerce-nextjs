import Link from 'next/link';
import React, { useContext } from 'react';
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { DataContext } from './DataContext';

const useStyles = makeStyles((theme) => ({
    card: {
        maxWidth: 330,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    media: {
        height: '12rem',
        backgroundSize: 'contain',
        backgroundPosition: 'center center',
    },
    productStatus: {
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
        color: 'black',
        fontWeight: 'bold',
        fontSize: '1.3em',
    },
    interactions: {
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
    },
    warning: {
        color: 'red',
    },
}));

const Product = ({ product }) => {
    const dataContext = useContext(DataContext);
    const { addProductToCart } = dataContext;
    const classes = useStyles();

    return (
        <Card className={classes.card} variant="outlined">
            <CardActionArea>
                <Link href={`/product/${encodeURIComponent(product.id)}`}>
                    <CardMedia
                        className={classes.media}
                        image={product.picture}
                        title={product.title}
                    />
                </Link>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {product.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                    >
                        {product.description.length > 100
                            ? product.description.substring(0, 100) + '...'
                            : product.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className={classes.interactions}>
                <Typography className={classes.productStatus}>
                    Price: ${product.price}
                </Typography>
                <Typography
                    className={classes.productStatus}
                    style={{ color: product.stock ? '' : 'red' }}
                >
                    {product.stock ? (
                        `Stock: ${product.stock}`
                    ) : (
                        <span className={classes.warning}>Out of Stock!</span>
                    )}
                </Typography>
                <IconButton
                    aria-label="share"
                    onClick={() => addProductToCart(product)}
                    disabled={!product.stock}
                >
                    <AddShoppingCartIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default Product;
