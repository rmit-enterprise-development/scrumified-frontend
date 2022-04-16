import {
  Box,
  CloseButton,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React from "react";
import Images from "../../../assets/images";
import { LinkItems } from "./LinkItems";
import { SidebarItem } from "./SidebarItem";
import { FaMoon, FaSun } from "react-icons/fa"

export function SidebarContent({ onClose, ...rest }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const text = useColorModeValue("dark", "light");
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);

  return (
    <Box
      bg={useColorModeValue("#fffdfe", "#031d46")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      display="flex"
      flexDir="column"
      justifyContent="space-between"
    >
      <Flex h="20" alignItems="center" flexDir='column' w='full'>
        <Flex justifyContent="center" mt={6} cursor="pointer">
          <NextLink href="/dashboard" passHref>
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

        <Flex flexDir='column' mt={5} w='full'>
          {LinkItems.map((link) => (
            <SidebarItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </SidebarItem>
          ))}
        </Flex>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>


      <Flex
        p='4'
        flexDir="row"
        justifyContent="space-between"
        w="full"
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
            marginLeft='1'
            cursor="pointer"
            color={useColorModeValue("#031d46", "#fffdfe")}
          >
            Khang Nguyen
          </Text>
        </NextLink>

        <IconButton
          variant="ghost"
          color={useColorModeValue("yellow", "#031d46")}
          bg={useColorModeValue("#031d46", "#fffdfe")}
          onClick={toggleColorMode}
          marginLeft="5"
          icon= {<SwitchIcon />}
          _hover={{
            textDecoration:"none",
            bg: useColorModeValue("gray.600", "gray.400")
          }}
        />
      </Flex>
    </Box>
  );
}
