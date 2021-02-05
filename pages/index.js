import { Grid } from '@material-ui/core';
import Product from '../Components/Product';
import { useContext, useEffect } from 'react';
import { DataContext } from '../Components/DataContext';

export default function Home() {
    const dataContext = useContext(DataContext);
    const { allProducts, setAllProducts } = dataContext;
    const renderedProducts = allProducts.map((product) => {
        return (
            <Grid
                item
                container
                justify="center"
                xl={3} //4
                lg={3} //4
                md={4} //2
                sm={6} //1
                xs={12} //1
                key={product.id}
            >
                <Product product={product} />
            </Grid>
        );
    });
    return (
        <>
            <Grid container style={{ paddingTop: '1rem' }}>
                {renderedProducts}
            </Grid>
        </>
    );
}
