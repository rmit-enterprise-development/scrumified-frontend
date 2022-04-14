import { Box } from "@chakra-ui/react";
import React from "react";
import Board from "../components/backlog/Board";
import SectionHeader from "../components/dashboard/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/Sidebar.tsx";

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
