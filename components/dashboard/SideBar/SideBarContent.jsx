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
import { FaMoon, FaSun } from "react-icons/fa";
import Images from "../../../assets/images";
import { LinkItems } from "./LinkItems";
import { SidebarItem } from "./SidebarItem";

export function SidebarContent({ onClose, toggleColorMode, ...rest }) {
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);

  return (
    <Box
      bg="#031d46"
      borderRight="1px"
      borderRightColor="gray.600"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex flexDir="column" justifyContent="space-between" h="full">
        <Flex h="20" alignItems="center" flexDir="column" w="full">
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

          <Flex flexDir="column" mt={5} w="full">
            {LinkItems.map((link) => (
              <SidebarItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
              </SidebarItem>
            ))}
          </Flex>
        </Flex>

        <Flex
          p="4"
          flexDir="row"
          justifyContent="space-between"
          w="full"
          alignItems="center"
        >
          <NextLink href="/profile" passHref>
            <Flex alignItems="center">
              <IconButton
                aria-label="Profile"
                isRound={true}
                variant="outline"
                icon={
                  <Avvvatars shadow={true} value="Khang Nguyen" />
                }
              />
              <Text pl={2} cursor="pointer" color="#FFFDEF">
                Khang
              </Text>
            </Flex>
          </NextLink>

          <IconButton
            variant="ghost"
            color="#FFFDEF"
            onClick={toggleColorMode}
            marginLeft="5"
            fontSize="lg"
            _hover={{ bg: "#ee0405" }}
            icon={<SwitchIcon />}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
