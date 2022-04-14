import { Box, Button, Divider, Flex } from "@chakra-ui/react";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar.tsx";

const Dashboard = () => {

  return (
    <Box display="flex" >
      <Sidebar />
      <Box m={10}>
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <SectionHeader>My Projects</SectionHeader>
            <Button leftIcon={<HiOutlinePlusSm />} size="sm" colorScheme="teal">
              Create Project
            </Button>
          </Flex>

          <ProjectGrid />

          <SectionHeader>Assigned to me</SectionHeader>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
