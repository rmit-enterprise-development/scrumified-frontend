import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";
import Images from "../../../assets/images";
import { LinkItems } from "./LinkItems";
import { SideBarItem } from "./SideBarItem";

export function SideBarContent({ onClose, ...rest }) {
  return (
    <Box
      bg={useColorModeValue("#fffdfe", "#031d46")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="center">
        <Flex justifyContent="center" mt={5} cursor="pointer">
          <NextLink href="./dashboard" passHref>
            <motion.div
              style={{ height: "50px", width: "50px" }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                loop: Infinity,
                ease: "linear",
                duration: 6,
              }}
            >
              <Image
                src={Images.MainLogo.src}
                alt="Main logo"
                width="100%"
                height="100%"
              />
            </motion.div>
          </NextLink>
        </Flex>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <SideBarItem key={link.name} icon={link.icon} href={link.href}>
          {link.name}
        </SideBarItem>
      ))}

      <Flex
        p={5}
        flexDir="row"
        justifyContent="space-around"
        w="100%"
        alignItems="center"
      >
        <NextLink href="/profile" passHref>
          <IconButton
            aria-label="Profile"
            isRound={true}
            variant="outline"
            icon={<Avvvatars shadow={true} size="md" value="Khang Nguyen" />}
          />
        </NextLink>
        <NextLink href="/profile" passHref>
          <Text
            cursor="pointer"
            color={useColorModeValue("#031d46", "#fffdfe")}
          >
            Khang Nguyen
          </Text>
        </NextLink>
      </Flex>
    </Box>
  );
}
