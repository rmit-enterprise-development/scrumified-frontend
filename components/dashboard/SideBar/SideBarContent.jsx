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

export function SidebarContent({ onClose, ...rest }) {
  const { colorMode, toggleColorMode } = useColorMode();
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
        <Flex justifyContent="center" mt={5} cursor="pointer">
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

        <Flex flexDir='column' mt={5}>
          {LinkItems.map((link) => (
            <SidebarItem key={link.name} icon={link.icon} href={link.href}>
              {link.name}
            </SidebarItem>
          ))}
        </Flex>

        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>


      <Flex
        p={5}
        flexDir="row"
        justifyContent="flex-start"
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
        <Switch
          isChecked={colorMode === "dark"}
          onChange={() => {
            toggleColorMode();
          }}
          colorScheme="green"
          size="lg"
        />
      </Flex>
    </Box>
  );
}
