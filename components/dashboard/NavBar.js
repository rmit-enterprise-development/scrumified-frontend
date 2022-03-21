import React from 'react';
import Avvvatars from 'avvvatars-react';
import Link as NextLink} from 'next/link';
import { Flex, useColorMode, useDisclosure } from '@chakra-ui/react';
import { NavBarDataUp } from './NavBarDataUp';
import { NavBarDataDown } from './NavBarDataDown';

function NavBar() {
    return (
        <div>
            <div className="navbar">
                <Link href="#" className="menu-bars">
                    <Avvvatars value="Scrumified" />
                </Link>
            </div>

            <nav className="nav-menu-up">
                <ul className="nav-menu-items">
                    {NavBarDataUp.map((item, index) => {
                        return (
                            <li key={index} className={item.name}>
                                <Link href={item.path} className={item.name}>
                                    {item.icon}
                                </Link>
                                <Link href={item.path} className={item.name}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <nav className='nav-menu-down'>
                <ul className="nav-menu-items">
                    {NavBarDataDown.map((item, index) => {
                        return (
                            <li key={index} className={item.name}>
                                <Link href={item.path} className={item.name}>
                                    {item.icon}
                                </Link>
                                <Link href={item.path} className={item.name}>
                                    {item.title}
                                </Link>
                            </li>
                        )
                    })}
                    <li className="profile">
                        <Link href="/profile">
                            <Avvvatars value="Khang Nguyen" />
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;