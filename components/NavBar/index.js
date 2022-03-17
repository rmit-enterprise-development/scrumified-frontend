import Image from "next/image";
import NextLink from "next/link";

import { Flex, Text, Button, Link } from "@chakra-ui/react";
import DarkModeSwitch from "../DarkModeSwitch";
import ImageResrouces from "../../assets/images";

const NavBar = ({ navContent }) => (
  <Flex
    alignItems="center"
    justifyContent="space-between"
    px={5}
    py={3}
    borderBottom="1px"
    borderColor="gray.200"
  >
    {/* logo */}
    <NextLink href="/" passHref>
      <Link
        _hover={{
          color: "#4599fe",
        }}
        style={{ textDecoration: "none" }}
      >
        <Flex alignItems="center">
          <Image
            src={ImageResrouces.MainLogo}
            alt="App main logo"
            width="50%"
            height="50%"
          />

          <Text fontSize="3xl" fontWeight="bold" color="#031e49">
            Scrumified
          </Text>
        </Flex>
      </Link>
    </NextLink>

    {/* nav content */}
    <Flex alignItems="center" gap="12">
      {navContent.map((textContent) => (
        <Link
          key={textContent}
          _hover={{
            color: "#4599fe",
          }}
          style={{ textDecoration: "none" }}
        >
          <Text fontSize="sm">{textContent}</Text>
        </Link>
      ))}
    </Flex>

    {/* buttons */}
    <Flex alignItems="center" gap="5">
      <DarkModeSwitch />

      <Button>GET STARTED</Button>
    </Flex>
  </Flex>
);

export default NavBar;
