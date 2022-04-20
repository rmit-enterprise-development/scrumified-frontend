import { AiFillHome } from "react-icons/ai";
import { GiSprint } from "react-icons/gi";
import { MdTimeline } from "react-icons/md";
import { VscTasklist } from "react-icons/vsc";
import { RouterPage } from "../../../config/router";

export const LinkItems = [
  { name: "Dashboard", icon: AiFillHome, href: RouterPage.DASHBOARD },
  { name: "Backlog", icon: VscTasklist, href: RouterPage.BACKLOG },
  { name: "Active Sprint", icon: GiSprint, href: RouterPage.SPRINT },
  { name: "Roadmap", icon: MdTimeline, href: RouterPage.ROADMAP },
];
