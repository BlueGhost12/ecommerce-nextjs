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

    useEffect(() => {
        const fetchProducts = async () => {
            // console.log(server);
            return await axios.get(`${server}/api/products`);
        };
        fetchProducts().then((res) => {
            setAllProducts(res.data);
            console.log(allProducts);
        });
    }, []);

    useEffect(() => {
        updateCartCost(cart);
    }, [cart]);

    const updateProductStock = (product, quantity) => {
        let productInstance = allProducts;
        productInstance.forEach((item) => {
            if (item === product) {
                item.stock += quantity;
            }
        });
        setAllProducts(productInstance);
    };

    const updateCartCost = (cart) => {
        let sum = 0;
        console.log(cart);
        cart.forEach((item) => {
            sum += item.subtotal;
        });
        setSubtotalCost(Math.floor(sum * 100) / 100);
        console.log(subtotalCost);
        const taxOnProducts = subtotalCost * 0.1;
        setTax(Math.floor(taxOnProducts * 100) / 100);
        console.log(tax);
        setTotalCost(Math.floor((subtotalCost + taxOnProducts) * 100) / 100);
        console.log(totalCost);
    };

    const addProductToCart = async (product) => {
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
            console.log(cart);
        }
        // updateCartCost(cart);
        setCartItemQuantity((prevCount) => prevCount + 1);
        updateProductStock(product, -1);
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
        updateProductStock(productItem, cartProduct.instance);
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

        // Adding stock to products
        const productItem = allProducts.find(
            (product) => cartProduct.id === product.id
        );
        updateProductStock(productItem, -quantity);
    };

    const isProductAvailable = (cartProduct) => {
        const productItem = allProducts.find(
            (product) => cartProduct.id === product.id
        );
        return productItem.stock > 0;
    };

    const emptyCart = () => {
        setCart([]);
        setCartItemQuantity(0);
        updateCartCost(cart);
    };

    const dataContext = {
        subtotalCost,
        totalCost,
        tax,
        isProductAvailable,
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
