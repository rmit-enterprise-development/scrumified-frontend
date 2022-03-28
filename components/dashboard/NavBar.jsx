import React from 'react';
import Avvvatars from 'avvvatars-react';
import NextLink from 'next/link';
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
    Image,
  } from '@chakra-ui/react';
import NavItem from './NavItem'
import { motion } from 'framer-motion';
import Images from '../../assets/images';

export default function Navbar() {
    return (
        <Flex h='100vh' w='100px' boxShadow='0 4px 12px 0 rgba(0, 0, , 0.05)' flexDir='column' bg='pink.100' >

            <Flex p="0%" flexDir="column" w="100%" alignItems="flex-start" mb={0} >
                <Divider />
                <Flex mt={0} align="center" cursor="pointer">
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

                    <NextLink href="/" passHref>
                        <Text
                            fontSize={{ base: '2xl', lg: '3xl' }}
                            fontWeight="bold"
                            color="#4599fe"
                            ml={2}
                        >
                            Scrumified
                        </Text>
                    </NextLink>
                </Flex>
            </Flex>
            
            <Flex flexDir='column' alignItems='flex-start' as='nav' mt={7}>
                <NavItem icon={ AiFillHome } title="Dashboard" href='./index' active />
                <NavItem icon={ MdTimeline } title="Roadmap" href='./roadmap'/>
                <NavItem icon={ VscTasklist } title="Backlog" href='backlog' />
                <NavItem icon={ GiSprint } title="Active Sprint" href='activesprint'/>
                <NavItem icon={ FaClipboard } title="Reports" href='./report'/>
                <NavItem icon={ AiFillNotification } title="Notifications" href='./notification' />
                <NavItem icon={ MdOutlineHelp } title="Help" href='./help'/>
                <NavItem icon={ AiFillSetting } title="Settings" href='./setting' />
            </Flex>

            <Flex flexDir="column" w="100%" alignItems="flex-start" mt={20} >
                <Divider />
                <Flex mt={4} align="center">
                    <Avvvatars size='sm' value="Khang Nguyen"></Avvvatars>
                    <Flex flexDir="column" ml={4}>
                        <NextLink href="/profile" passHref><Heading as="h3" size="sm">Khang Nguyen</Heading></NextLink>
                    </Flex>
                </Flex>
            </Flex>

        </Flex>
    )
}