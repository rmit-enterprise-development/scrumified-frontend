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
          backgroundColor={current && "#AEC8CA"}
          p={3}                                             
          borderRadius={6}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          href={href}
        >
          <MenuButton w="100%" onMouseEnter={onOpen} onMouseLeave={onClose} >
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={current ? "#82AAAD" : "gray.500"}
              />
            </Flex>
          </MenuButton>
        </Link>
        <MenuList
          py={0}
          w={200}
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
