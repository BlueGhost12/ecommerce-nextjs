import React, { createContext, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { server } from '../Config';

export const DataContext = createContext();

const DataProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [cartItemQuantity, setCartItemQuantity] = useState(0);
    const [allProducts, setAllProducts] = useState([]);
    const [tax, setTax] = useState(0.0);
    const [totalCost, setTotalCost] = useState(0.0);
    const [subtotalCost, setSubtotalCost] = useState(0.0);


    // initial product fetching
    useEffect(() => {
        const fetchProducts = async () => {
            return await axios.get(`${server}/api/products`);
        };
        fetchProducts().then((res) => setAllProducts(res.data));
    }, [cart]);

    // updating initial state of local storage
    useEffect(() => {

        localStorage.getItem('cart')
            ? setCart(JSON.parse(localStorage.getItem('cart')))
            : null;
        localStorage.getItem('cartItemQuantity')
            ? setCartItemQuantity(
            JSON.parse(localStorage.getItem('cartItemQuantity'))
            )
            : null;
        updateCartCost(cart);
    }, []);

    // updating local storage on cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem(
            'cartItemQuantity',
            JSON.stringify(cartItemQuantity)
        );
        updateCartCost(cart);
        localStorage.setItem('subTotalCost', JSON.stringify(subtotalCost));
        localStorage.setItem('totalCost', JSON.stringify(totalCost));
        localStorage.setItem('tax', JSON.stringify(tax));
    }, [cart, cartItemQuantity, subtotalCost, totalCost, tax, allProducts]);

    const updateCartCost = (cart) => {
        let sum = 0;
        cart.forEach((item) => {
            sum += item.subtotal;
        });
        setSubtotalCost(Math.floor(sum * 100) / 100);
        const taxOnProducts = subtotalCost * 0.1;
        setTax(Math.floor(taxOnProducts * 100) / 100);
        setTotalCost(Math.floor((subtotalCost + taxOnProducts) * 100) / 100);
    };

    const addProductToCart = (product) => {
        if (cart.find((cartItem) => cartItem.id === product.id)) {
            // adding another instance of product to cart
            let cartInstance = [...cart];
            cartInstance.forEach((item) => {
                if (item.id === product.id) {
                    // increase cart product instance
                    item.instance++;
                    item.subtotal =
                        Math.floor(item.instance * item.price * 100) / 100;
                }
                setCart(() => cartInstance);
            });
        } else {
            // adding first instance of product
            const newCartProduct = {
                id: product.id,
                title: product.title,
                instance: 1,
                picture: product.picture,
                price: product.price,
                subtotal: product.price,
            };
            setCart(() => [...cart, newCartProduct]);
        }
        setCartItemQuantity((prevCount) => prevCount + 1);
    };

    const removeFromCart = (cartProduct) => {
        // removing from cart
        const cartInstance = [...cart];
        const indexOfProductInCart = cartInstance.indexOf(cartProduct);
        cartInstance.splice(indexOfProductInCart, 1);
        setCart(() => cartInstance);
        setCartItemQuantity((prevCount) => prevCount - cartProduct.instance);
        updateCartCost(cart);

        // Adding stock to products
        const productItem = allProducts.find(
            (product) => cartProduct.id === product.id
        );
    };

    const updateCart = (cartProduct, quantity) => {
        const cartInstance = [...cart];
        const indexOfProductInCart = cartInstance.indexOf(cartProduct);
        if (
            cartInstance[indexOfProductInCart].instance === 1 &&
            quantity === -1
        ) {
            cartInstance.splice(indexOfProductInCart, 1);
        } else {
            cartInstance[indexOfProductInCart].instance += quantity;
            cartInstance[indexOfProductInCart].subtotal =
                Math.floor(
                    cartInstance[indexOfProductInCart].instance *
                        cartInstance[indexOfProductInCart].price *
                        100
                ) / 100;
        }
        setCart(() => cartInstance);
        setCartItemQuantity((prevCount) => prevCount + quantity);
        updateCartCost(cart);
    };

    // const isProductAvailable = (cartProduct) => {
    //     const productItem = allProducts.find(
    //         (product) => cartProduct.id === product.id
    //     );
    //     return (productItem && productItem.instance > 0) || true;
    // };

    const isProductAvailableInDatabase = async (id) => {
        const products = await axios.get(`${server}/api/products/${id}`);
        console.log(products);
    }

    const isStockAvailable = (id) => {
        const cartProduct = cart.find(prod => prod.id === id);
        const product = allProducts.find(prod => prod.id === id);
        // cartProduct && product ? console.log(cartProduct.instance, product.stock) : null;
        if(product && product.stock === 0) return true;
        else if(cartProduct && product && cartProduct.instance === product.stock) return true;
        else if(!cartProduct && product && product.stock > 0) return false;
        else return false;
    }

    const emptyCart = () => {
        setCart([]);
        setCartItemQuantity(0);
        updateCartCost(cart);
    };

    const updateCartQuantity = (quantity) => {
        setCartItemQuantity(quantity)
    }

    const dataContext = {
        updateCartQuantity,
        setCartItemQuantity,
        isStockAvailable,
        emptyCart,
        subtotalCost,
        totalCost,
        tax,
        updateCart,
        updateCartCost,
        removeFromCart,
        cartItemQuantity,
        addProductToCart,
        allProducts,
        setAllProducts,
        setCart,
        cart,
    };
    return (
        <DataContext.Provider value={dataContext}>
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;
