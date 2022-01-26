import Link from 'next/link';

const Navbar = ({pageProps}) => {
    
    return (
    <nav className="navbar">
        <Link href={"/home/"+pageProps}>
            <a className="navbar-brand">Note App</a>
        </Link>
        <Link href={'/new/'+pageProps}>
            <a className="create">Create note</a>
        </Link>
    </nav>
)
}
export default Navbar;