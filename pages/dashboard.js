import { Box, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar.tsx";
import userAPI from "../api/services/userAPI";

const Dashboard = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await userAPI.getAll();
        setUserList(response);
      } catch (error) {
        console.log("Fail to fetch: ", error);
      }
    };

    fetchUserList();
  }, []);

  console.log("userList: ", userList);

  return (
    <Box display="flex">
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
