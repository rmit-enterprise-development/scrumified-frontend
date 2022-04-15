import { Box } from "@chakra-ui/react";
import React from "react";
import Board from "../components/backlog/Board";
import SectionHeader from "../components/dashboard/SectionHeader/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar";

const Backlog = () => {
  return (
    <Box display="flex">
      <Box>
        <Sidebar />
      </Box>
      <Box m={10} w="100%">
        <Box>
          <SectionHeader>Backlog</SectionHeader>
          <Board />
        </Box>
      </Box>
    </Box>
  );
};

export default Backlog;
