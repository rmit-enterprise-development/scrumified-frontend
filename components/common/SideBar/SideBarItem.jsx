import { Box, Flex, Icon } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { RouterPage } from "../../../config/router";

export const SideBarItem = ({ icon, children, href, ...rest }) => {
  const router = useRouter();
  const active = router.route.includes(href);

  // Can't get value from first render -> Need to useEffect
  const [id, setId] = useState();
  useEffect(() => {
    if (router.isReady) {
      const { id } = router.query;
      setId(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  return (
    <Box pb={3}>
      <NextLink
        href={
          href === RouterPage.DASHBOARD
            ? {
                pathname: href,
              }
            : {
                pathname: `/project/[id]${href}`,
                query: { id },
              }
        }
        passHref
      >
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          color={
            router.route === RouterPage.DASHBOARD &&
            href !== RouterPage.DASHBOARD
              ? "grey"
              : "#fffdfe"
          }
          pointerEvents={
            router.route === RouterPage.DASHBOARD &&
            href !== RouterPage.DASHBOARD
              ? "none"
              : "auto"
          }
          bg={active && "#ee0405"}
          _hover={{
            textDecoration: "underline",
            textDecorationStyle: "wavy",
            textUnderlineOffset: "4px",
            textDecorationThickness: "1.5px",
          }}
          {...rest}
        >
          <Icon
            mr="4"
            fontSize="lg"
            color={
              router.route === RouterPage.DASHBOARD &&
              href !== RouterPage.DASHBOARD
                ? "grey"
                : "#fffdfe"
            }
            as={icon}
          />
          {children}
        </Flex>
      </NextLink>
    </Box>
  );
};
