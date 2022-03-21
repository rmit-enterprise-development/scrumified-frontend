import React from 'react';
import { Icon } from '@chakra-ui/react'
import { AiFillHome } from 'react-icons/ai';
import { MdTimeline } from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import { GiSprint } from 'react-icons/gi';
import { FaClipboard } from 'react-icons/fa';

export const NavBarDataUp = [
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
    }
]