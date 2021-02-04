import '../styles/globals.css';
import Layout from '../Components/Layout';
import DataProvider from '../Components/DataContext';

function MyApp({ Component, pageProps }) {
    return (
        <DataProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </DataProvider>
    );
}

export default MyApp;
