import React from 'react';
import { Icon } from '@chakra-ui/react'
import { AiFillSetting,AiFillNotification } from 'react-icons/ai';
import { MdOutlineHelp } from 'react-icons/md';


export const NavBarDataDown = [
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