import React from 'react';
import Avvvatars from 'avvvatars-react';
import {Link as NextLink} from 'next/link';
// import { Link, Box, Center, Wrap, WrapItem, useDisclosure } from '@chakra-ui/react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps,
    WrapItem,
    Wrap,
    
  } from '@chakra-ui/react';

import { NavBarData } from './NavBarData';

export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box bg='pink' h='100vh'>
            <Box className="navbar">
                <Link as={NextLink} href="#" className="menu-bars">
                    <Avvvatars value="Scrumified" />
                </Link>
            </Box>

            <Box className="nav-menu-up" bg='teal' h='80vh'>
                <Wrap className="nav-menu-items">
                    {NavBarData.map((item, index) => {
                        return (
                            <WrapItem key={index} className={item.name}>
                                <Link as={NextLink} href={item.path} className={item.name}>
                                    {item.icon} {item.title}
                                </Link>
                            </WrapItem>
                        )
                    })}
                    <WrapItem className="profile">
                        <Link href="/profile">
                            <Avvvatars value="Khang Nguyen" />
                        </Link>
                    </WrapItem>
                </Wrap>
            </Box>
        </Box>
    );
}