import Link from 'next/link';
import { useContext } from 'react';
import UserContext from '../context/UserContext';

const Navbar = ({}) => {
    const value = useContext(UserContext);
    console.log("user login value",value);
    return (
    <nav className="navbar">
        <Link href={"/home/"+value}>
            <a className="navbar-brand">Note App</a>
        </Link>
        <Link href={'/new/'+value}>
            <a className="create">Create note</a>
        </Link>
    </nav>
)
}
export default Navbar;