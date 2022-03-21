import React, {useState} from 'react';
import Avvvatars from 'avvvatars-react';
import Link from 'next/link';
import * as Icons from 'react-icons';

function NavBar() {
    // const {sidebar, setSideBar} = useState(false)

    // const showSidebar = () => setSideBar(!sidebar)
    return (
        <div>
            <div className="navbar">
                <Link href="#" className="menu-bars">
                    <Avvvatars value="Scrumified" />
                </Link>
            </div>

            <nav className="nav-menu active">
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link href="#" className="menu-bars">
                            <h1>Menu 1</h1>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;