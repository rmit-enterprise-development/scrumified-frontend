import React from 'react'
import {
    Flex,
    Text,
    Icon,
    Link,
    Menu,
    MenuButton,
    MenuList
} from '@chakra-ui/react'

export default function NavItem({ icon, title, path, active }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems= "flex-start"
        >
            <Menu placement="right">
                <Link backgroundColor="#AEC8CA" p={3} borderRadius={6} w= "100%" href={path} >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "red" : "gray"} />
                            <Text ml={5} display="flex" color={active ? "red" : "gray"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
            </Menu>
        </Flex>
    )
}