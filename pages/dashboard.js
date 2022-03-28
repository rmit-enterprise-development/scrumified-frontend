import { Box } from "@chakra-ui/react";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader";

const Dashboard = () => {
  return (
    <Box m={10}>
      <SectionHeader>Hello</SectionHeader>

      <ProjectGrid />

      <SectionHeader>Assigned to me</SectionHeader>
    </Box>
  );
};

export default Dashboard;
