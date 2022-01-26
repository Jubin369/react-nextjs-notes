import Head from 'next/head';
import Navbar from './Navbar';

const Layout = ({ children,pageProps }) => (
    <>
        <Head>
            <title>Note App</title>
        </Head>
        <Navbar pageProps={pageProps}/>
        {children}
    </>
)

export default Layout;