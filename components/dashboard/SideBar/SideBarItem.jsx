import React from "react";
import {
  useDisclosure,
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react";
import NextLink from "next/link";
import NavHoverBox from "./SideBarHoverBox";

export default function SideBarItem({ icon, title, inactive, href, current }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex mt={30} flexDir="column" w="100%" alignItems="center">
      <Menu placement="right" isOpen={isOpen} onClose={onClose}>
        <Link
          as={Link}
          p={3}                  
          border={current ? '2px' : 'none'}
          borderRadius={6}
          borderColor={current ? "#EE0405" : "none"}
          _hover={{ textDecor: "none", backgroundColor: "#EE0405" }}
          href={href}
        >
          <MenuButton w="100%" onMouseEnter={onOpen} onMouseLeave={onClose} alignItems="center" >
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color='#fffdfe'
              />
            </Flex>
          </MenuButton>
        </Link>
        <MenuList
          py={0}
          h={50}
          border="none"
          borderRadius="10px"
          ml={5}
          onMouseEnter={onOpen}
          onMouseLeave={onClose}
        >
          <NavHoverBox title={title} />
        </MenuList>
      </Menu>
    </Flex>
  );
}
