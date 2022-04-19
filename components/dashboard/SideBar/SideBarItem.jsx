import { Flex, Icon, Box, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { RouterPage } from "../../../config/router";

export const SidebarItem = ({ icon, children, href, ...rest }) => {
  const router = useRouter();
  const active = router.route === href;

  return (
    <Box pb={3}>
      <NextLink href={href} passHref >
        <Tooltip 
          hasArrow
          placement='right'
          isDisabled={router.route === RouterPage.DASHBOARD &&
            href !== RouterPage.DASHBOARD
            ? false
            : true}
          label="Please choose a project first"
          >
          <Flex
            align="center"
            p="4"
            mx="4"
            borderRadius="lg"
            role="group"
            pointerEvents="auto"
            color= {
              router.route === RouterPage.DASHBOARD &&
              href !== RouterPage.DASHBOARD
              ? "grey"
              : "#fffdfe"
            }
            cursor={
              router.route === RouterPage.DASHBOARD &&
              href !== RouterPage.DASHBOARD
                ? "not-allowed"
                : "pointer"
            }
            bg={active && "#ee0405"}
            _hover={{
              // color: '#fffdfe',
              textDecoration: 'underline',
              textDecorationStyle: 'wavy',
              textUnderlineOffset: '4px',
              textDecorationThickness: '1.5px',
            }}
            {...rest}
          >
            <Icon mr="4" fontSize="lg" color="#fffdfe" as={icon} />
            {children}
          </Flex>
        </Tooltip>
      </NextLink>
    </Box>
  );
};
