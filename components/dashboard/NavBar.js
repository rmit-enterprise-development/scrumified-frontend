import React from 'react';
import Avvvatars from 'avvvatars-react';
import { AiFillHome,AiFillNotification,AiFillSetting } from 'react-icons/ai';
import { MdTimeline,MdOutlineHelp } from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import { GiSprint } from 'react-icons/gi';
import { FaClipboard } from 'react-icons/fa';
import {
    Flex,
    Text,
    Divider,
    Heading,
  } from '@chakra-ui/react';
import NavItem from './NavItem'

export default function Navbar() {
    return (
        <Flex pos='sticky' left='5' h='95vh' w='200px' marginTop='2.5vh' boxShadow='0 4px 12px 0 rgba(0, 0, , 0.05)' flexDir='column' justifyContent='space-between'>

            <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={0} >
                <Divider />
                <Flex mt={0} align="center">
                    <Avvvatars size='sm' value="Scrumified"></Avvvatars>
                    <Flex flexDir="column" ml={4}>
                        <Heading as="h3" size="sm">Scrumified</Heading>
                    </Flex>
                </Flex>
            </Flex>
            
            <Flex p="5%" flexDir='column' alignItems='flex-start' as='nav' >
                <NavItem icon={ AiFillHome } title="Dashboard" path='./index' active />
                <NavItem icon={ MdTimeline } title="Roadmap" path='./roadmap'/>
                <NavItem icon={ VscTasklist } title="Backlog" path='backlog' />
                <NavItem icon={ GiSprint } title="Active Sprint" path='activesprint'/>
                <NavItem icon={ FaClipboard } title="Reports" path='./report'/>
                <NavItem icon={ AiFillNotification } title="Notifications" path='./notification' />
                <NavItem icon={ MdOutlineHelp } title="Help" path='./help'/>
                <NavItem icon={ AiFillSetting } title="Settings" path='./setting' />
            </Flex>

            <Flex p="5%" flexDir="column" w="100%" alignItems="flex-start" mb={0} >
                <Divider />
                <Flex mt={4} align="center">
                    <Avvvatars size='sm' value="Khang Nguyen"></Avvvatars>
                    <Flex flexDir="column" ml={4}>
                        <Heading as="h3" size="sm">Khang Nguyen</Heading>
                        <Text color="gray">Online</Text>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}