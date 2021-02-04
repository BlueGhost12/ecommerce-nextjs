import { Grid } from '@material-ui/core';
import Product from '../Components/Product';
import { useContext, useEffect } from 'react';
import { DataContext } from '../Components/DataContext';

export default function Home() {
    const dataContext = useContext(DataContext);
    const { allProducts, setAllProducts } = dataContext;
    const renderedProducts = allProducts.map((product) => {
        return (
            <Grid item container justify="center" xs={3} key={product.id}>
                <Product product={product} />
            </Grid>
        );
    });
    return (
        <>
            <Grid container style={{ paddingTop: '2rem' }}>
                {renderedProducts}
            </Grid>
        </>
    );
}
