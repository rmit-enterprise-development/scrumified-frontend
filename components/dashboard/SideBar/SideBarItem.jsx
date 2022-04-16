import NextLink from "next/link";
import { Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import React from "react";

export const SidebarItem = ({ icon, children, href, ...rest }) => {
  return (
    <NextLink href={href} passHref>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        color={useColorModeValue("#031d46", "#fffdfe")}
        cursor="pointer"
        _hover={{
          bg: useColorModeValue("#031d46", "#ee0405"),
          color: useColorModeValue("#fffdfe", "#fffdfe"),
        }}
        {...rest}
      >
        {/* {icon && ( */}
        <Icon
          mr="4"
          fontSize="lg"
          color={useColorModeValue("#031d46", "#fffdfe")}
          _groupHover={{
            color: useColorModeValue("#fffdfe", "#fffdfe"),
          }}
          as={icon}
        />
        {/* )} */}
        {children}
      </Flex>
    </NextLink>
  );
};
