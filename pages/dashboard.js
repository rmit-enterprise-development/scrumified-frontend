import { Box } from "@chakra-ui/react";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar.tsx";

const Dashboard = () => {

  return (
    <Box display="flex" >
      <Sidebar />
      <Box m={10}>
        <Box>
          <SectionHeader>Hello</SectionHeader>

          <ProjectGrid />

          <SectionHeader>Assigned to me</SectionHeader>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
