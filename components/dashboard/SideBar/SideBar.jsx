import React from "react";
import Avvvatars from "avvvatars-react";
import NextLink from "next/link";
import { AiFillHome, AiFillNotification, AiFillSetting } from "react-icons/ai";
import { MdTimeline, MdOutlineHelp } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { GiSprint } from "react-icons/gi";
import { FaClipboard } from "react-icons/fa";
import {
  Flex,
  Text,
  Divider,
  Heading,
  Image,
  Box,
  IconButton,
} from "@chakra-ui/react";
import SideBarItem from "./SideBarItem";
import { motion } from "framer-motion";
import Images from "../../../assets/images";

export default function SideBar() {
  return (
    <Flex
      h="100vh"
      w="100px"
      boxShadow="0 4px 12px 0 rgba(0, 0, , 0.05)"
      flexDir="column"
      bg="#031e49"
    >
      <Flex p="0%" justifyContent="center" mt={5} cursor="pointer">
        <NextLink href="/" passHref>
          <motion.div
            style={{ height: '50px', width: '50px' }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              loop: Infinity,
              ease: 'linear',
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

      <Flex flexDir="column" alignItems="flex-start" as="nav">
        <SideBarItem
          icon={AiFillHome}
          title="Dashboard"
          href="./index"
          current
        />
        <SideBarItem icon={MdTimeline} title="Roadmap" href="./roadmap" inactive />
        <SideBarItem icon={VscTasklist} title="Backlog" href="backlog" inactive />
        <SideBarItem icon={GiSprint} title="Active Sprint" href="activesprint" inactive />
        <SideBarItem icon={FaClipboard} title="Reports" href="./report" inactive />
        <SideBarItem
          icon={AiFillNotification}
          title="Notifications"
          href="./notification"
        />
        <SideBarItem icon={MdOutlineHelp} title="Help" href="./help" />
        <SideBarItem icon={AiFillSetting} title="Settings" href="./setting" />
      </Flex>
      <Flex mt={30} flexDir="column" w="100%" alignItems="center">
        <NextLink href="/profile" passHref>
          <IconButton
            aria-label="Profile"
            isRound={true}
            variant="outline"
            icon={<Avvvatars shadow={true} size="sm" value="Khang Nguyen" />}
          />
        </NextLink>
      </Flex>
    </Flex>
  );
}
