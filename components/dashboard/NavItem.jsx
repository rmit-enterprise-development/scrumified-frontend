import React from 'react'
import {
    useDisclosure,
    Flex,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'
import NavHoverBox from './NavHoverBox'

export default function NavItem({ icon, title, active, href }) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems="center"
        >
            <Menu placement="right" isOpen={isOpen} onClose={onClose}>
                <Link
                    backgroundColor={active && "#AEC8CA"}
                    p={3}
                    borderRadius={8}
                    _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
                    href={href}
                >
                    <MenuButton w="100%" onMouseEnter={onOpen} onMouseLeave={onClose}>
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    ml={5}
                    onMouseEnter={onOpen} onMouseLeave={onClose}
                >
                    <NavHoverBox title={title} />
                </MenuList>
            </Menu>
        </Flex>
    )
}