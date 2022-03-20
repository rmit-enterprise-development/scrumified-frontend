import React from 'react';
import Avvvatars from 'avvvatars-react';
import Link from 'next/link';

function NavBar() {
    const {sidebar, setSideBar} = useState(false)

    const showSidebar = () => setSideBar(!sidebar)
    return (
        <div>
            <div className="navbar">
                <Link href="#" className="menu-bars">
                    <Avvvatars style="shape" value="Scrumified" />
                </Link>
            </div>

            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items">
                    <li className="navbar-toggle">
                        <Link href="#" className="menu-bars">

                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;