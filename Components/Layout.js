import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';

const Layout = ({ children }) => {
    return (
        <>
            <Head>
                <title>Shopee</title>
            </Head>
            <NavBar />
            <div>{children}</div>
        </>
    );
};

export default Layout;
