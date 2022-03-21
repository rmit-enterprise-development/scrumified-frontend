import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';
import * as VscIcons from 'react-icons/vsc';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';

export const NavBarData = [
    {
        title: 'Home',
        path: '../pages/index',
        icon: <AiIcons.AiFillHome />,
        name: 'nav-text'
    },
    {
        title: 'Roadmap',
        path: '../pages/roadmap',
        icon: <MdIcons.MdTimeline />,
        name: 'nav-text'
    },
    {
        title: 'Backlog',
        path: '../pages/backlog',
        icon: <VscIcons.VscTasklist />,
        name: 'nav-text'
    },
    {
        title: 'Active Sprint',
        path: '../pages/activesprint',
        icon: <GiIcons.GiSprint />,
        name: 'nav-text'
    },
    {
        title: 'Report',
        path: '../pages/report',
        icon: <BsIcons.BsClipboard />,
        name: 'nav-text'
    }
]