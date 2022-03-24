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
    Divider,
    Heading,
  } from '@chakra-ui/react';

import { NavBarData } from './NavBarData';

// export default function NavBar() {
//     const { isOpen, onOpen, onClose } = useDisclosure();
//     return (
//         <Box bg='pink' h='100vh'>
//             <Box className="navbar">
//                 <Link as={NextLink} href="#" className="menu-bars">
//                     <Avvvatars value="Scrumified" />
//                 </Link>
//             </Box>

//             <Box className="nav-menu-up" bg='teal' h='80vh'>
//                 <Wrap className="nav-menu-items">
//                     {NavBarData.map((item, index) => {
//                         return (
//                             <WrapItem key={index} className={item.name}>
//                                 <Link as={NextLink} href={item.path} className={item.name}>
//                                     {item.icon} {item.title}
//                                 </Link>
//                             </WrapItem>
//                         )
//                     })}
//                     <WrapItem className="profile">
//                         <Link href="/profile">
//                             <Avvvatars value="Khang Nguyen" />
//                         </Link>
//                     </WrapItem>
//                 </Wrap>
//             </Box>
//         </Box>
//     );
// }

export default function Navbar() {
    return (
        <Flex 
            pos='sticky' 
            left='5' 
            h='95vh' 
            w='200px'
            marginTop='2.5vh' 
            boxShadow='0 4px 12px 0 rgba(0, 0, , 0.05)'  
            flexDir='column'
            justifyContent='space-between'
        >
            <Flex
                p='5%'
                felxDir='column'
                w='100%'
                alignItems='flex-start'
                mb={4}
            >
                <Divider />
                <Flex md={4} align='center'>
                    <Avvvatars size='sm' value="Khang Nguyen"></Avvvatars>
                    <Flex flexDir='column' ml={4}>
                        <Heading as='h3' size='s' >Khang Nguyen</Text>
                    </Flex>
                </Flex>

            </Flex>

        </Flex>
    )
}