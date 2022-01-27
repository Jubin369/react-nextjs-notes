import Head from 'next/head';
import Navbar from './Navbar';
import UserContext from "../context/UserContext";

const Layout = ({ children,pageProps }) => (
    <>
        <UserContext.Provider value={pageProps}>
        <Head>
            <title>Note App</title>
        </Head>
        <Navbar />
        {children}
        </UserContext.Provider>
    </>
)

export default Layout;