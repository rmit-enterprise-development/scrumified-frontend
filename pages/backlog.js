import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Board from "../components/backlog/Board";
import SectionHeader from "../components/dashboard/SectionHeader/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar";

const Backlog = () => {
  return (
    <Flex>
      <Sidebar />
      <Box m={10} flexGrow="1">
        <Box>
          <SectionHeader>Backlog</SectionHeader>
          <Board />
        </Box>
      </Box>
    </Flex>
  );
};

export default Backlog;
