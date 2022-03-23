import React from 'react';
import { Icon } from '@chakra-ui/react'
import { AiFillHome,AiFillNotification,AiFillSetting } from 'react-icons/ai';
import { MdTimeline,MdOutlineHelp } from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import { GiSprint } from 'react-icons/gi';
import { FaClipboard } from 'react-icons/fa';

export const NavBarData = [
    {
        title: 'Home',
        path: './index',
        icon: <Icon as={AiFillHome} />,
        name: 'nav-text'
    },
    {
        title: 'Roadmap',
        path: '/roadmap',
        icon: <Icon as={MdTimeline} />,
        name: 'nav-text'
    },
    {
        title: 'Backlog',
        path: '/backlog',
        icon: <Icon as={VscTasklist} />,
        name: 'nav-text'
    },
    {
        title: 'Active Sprint',
        path: '/activesprint',
        icon: <Icon as={GiSprint} />,
        name: 'nav-text'
    },
    {
        title: 'Report',
        path: '/report',
        icon: <Icon as={FaClipboard} />,
        name: 'nav-text'
    },
    {
        title: 'Notification',
        path: './notification',
        icon: <Icon as={AiFillNotification} />,
        name: 'nav-text'
    },
    {
        title: 'Help',
        path: '/help',
        icon: <Icon as={MdOutlineHelp} />,
        name: 'nav-text'
    },
    {
        title: 'Setting',
        path: '/setting',
        icon: <Icon as={AiFillSetting} />,
        name: 'nav-text'
    }
]