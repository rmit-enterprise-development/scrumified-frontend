import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import { useContext } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import Images from "../../../assets/images";
import { RouterPage } from "../../../config/router";
import { LinkItems } from "./LinkItems";
import { SideBarItem } from "./SideBarItem";
import { LoggedUserContext } from "../LoggedUserProvider";
import textUtils from "../../../utils/text";

export function SidebarContent({ onClose, toggleColorMode, ...rest }) {
  const SwitchIcon = useColorModeValue(FaSun, FaMoon);
  const user = useContext(LoggedUserContext);
  const avatarValue =
    textUtils.getFirstLetters(user.firstName + " " + user.lastName) +
    user.logUserId;

  return (
    <Box
      bg="#1C345B"
      borderRight="1px"
      w={{ base: "full", md: 60 }}
      position="absolute"
      h="full"
      {...rest}
    >
      <Flex flexDir="column" justifyContent="space-between" h="full">
        <Flex h="20" alignItems="center" flexDir="column" w="full">
          <Flex justifyContent="center" mt={6} cursor="pointer">
            <NextLink href={RouterPage.DASHBOARD} passHref>
              <motion.div
                style={{ height: "50px", width: "50px" }}
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
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
              <SideBarItem key={link.name} icon={link.icon} href={link.href}>
                {link.name}
              </SideBarItem>
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
              <Avvvatars size={40} shadow={true} value={avatarValue} />
              <Text pl={3} cursor="pointer" color="#FFFDEF">
                {user ? user.firstName + " " + user.lastName : "Hello"}
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
