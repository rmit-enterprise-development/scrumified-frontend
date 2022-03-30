import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

export default function SideBarHoverBox({ title }) {
  return (
    <Flex
      h="100%"
      w="100%"
      flexDir="column"
      alignItems="center"
      justify="center"
      backgroundColor="#82AAAD"
      borderRadius="10px"
      color="#fff"
      textAlign="center"
    >
      <Heading size="md" fontWeight="normal">
        {title}
      </Heading>
    </Flex>
  );
}
