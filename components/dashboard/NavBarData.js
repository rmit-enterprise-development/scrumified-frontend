import React from 'react';
import { AiFillHome,AiFillNotification,AiFillSetting } from 'react-icons/ai';
import { MdTimeline,MdOutlineHelp } from 'react-icons/md';
import { VscTasklist } from 'react-icons/vsc';
import { GiSprint } from 'react-icons/gi';
import { FaClipboard } from 'react-icons/fa';

export const NavBarData = [
    {
        title: 'Home',
        path: './index',
        icon: { AiFillHome },
        name: 'nav-text'
    },
    {
        title: 'Roadmap',
        path: './roadmap',
        icon: { MdTimeline },
        name: 'nav-text'
    },
    {
        title: 'Backlog',
        path: './backlog',
        icon: { VscTasklist },
        name: 'nav-text'
    },
    {
        title: 'Active Sprint',
        path: './activesprint',
        icon: { GiSprint },
        name: 'nav-text'
    },
    {
        title: 'Report',
        path: './report',
        icon: { FaClipboard },
        name: 'nav-text'
    },
    {
        title: 'Notification',
        path: './notification',
        icon: { AiFillNotification },
        name: 'nav-text'
    },
    {
        title: 'Help',
        path: './help',
        icon: { MdOutlineHelp },
        name: 'nav-text'
    },
    {
        title: 'Setting',
        path: './setting',
        icon: {AiFillSetting},
        name: 'nav-text'
    }
]