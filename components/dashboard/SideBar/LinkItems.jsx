import { AiFillHome, AiFillNotification, AiFillSetting } from "react-icons/ai";
import { MdTimeline, MdOutlineHelp } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { GiSprint } from "react-icons/gi";
import { FaClipboard } from "react-icons/fa";
import { RouterPage } from "../../../config/router";

export const LinkItems = [
  { name: "Dashboard", icon: AiFillHome, href: RouterPage.DASHBOARD },
  { name: "Roadmap", icon: MdTimeline, href: RouterPage.ROADMAP },
  { name: "Backlog", icon: VscTasklist, href: RouterPage.BACKLOG },
  { name: "Active Sprint", icon: GiSprint, href: RouterPage.SPRINT },
];
