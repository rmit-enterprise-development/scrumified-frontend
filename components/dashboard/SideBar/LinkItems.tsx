import { IconType } from 'react-icons';
import { AiFillHome, AiFillNotification, AiFillSetting } from "react-icons/ai";
import { MdTimeline, MdOutlineHelp } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { GiSprint } from "react-icons/gi";
import { FaClipboard } from "react-icons/fa";

interface LinkItemProps {
    name: string;
    icon: IconType;
    href: string;
}
export const LinkItems: Array<LinkItemProps> = [
    { name: 'Dashboard', icon: AiFillHome, href:'./dashboard' },
    { name: 'Roadmap', icon: MdTimeline, href:'./roadmap' },
    { name: 'Backlog', icon: VscTasklist, href:'./backlog' },
    { name: 'Active Sprint', icon: GiSprint, href:'./activesprint' },
    { name: 'Reports', icon: FaClipboard, href:'./reports' },
    { name: 'Notification', icon: AiFillNotification, href:'./notification' },
    { name: 'Helps', icon: MdOutlineHelp, href:'./help' },
    { name: 'Setting', icon: AiFillSetting, href:'./setting' },
];