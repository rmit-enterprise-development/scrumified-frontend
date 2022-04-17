import { Flex, Icon, Box } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RouterPage } from "../../../config/router";

export const SidebarItem = ({ icon, children, href, ...rest }) => {
  const router = useRouter();
  const active = router.route === href;

  return (
    <Box pb={3}>
      <NextLink href={href} passHref disabled="true">
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          color="#fffdfe"
          pointerEvents={
            router.route === RouterPage.DASHBOARD &&
            href !== RouterPage.DASHBOARD
              ? "none"
              : "auto"
          }
          cursor="pointer"
          bg={active && "#ee0405"}
          _hover={{
            bg: "#ee0405",
          }}
          {...rest}
        >
          <Icon mr="4" fontSize="lg" color="#fffdfe" as={icon} />
          {children}
        </Flex>
      </NextLink>
    </Box>
  );
};
