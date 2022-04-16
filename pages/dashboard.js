import { Box, Button, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import userAPI from "../api/services/userAPI";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar.jsx";
import objectUtils from "../utils/object";

const Dashboard = () => {
  const [userList, setUserList] = useState([
    {
      id: "1",
      name: "Minh Pham",
      email: "pcminh0505@gmail.com",
    },
    {
      id: "3",
      name: "Thach Ho",
      email: "thachho@123@gmail.com",
    },
    {
      id: "2",
      name: "Khang Nguyen",
      email: "khangnguyen111101@gmail.com",
    },
    {
      id: "5",
      name: "Duong Nguyen",
      email: "duongnguyen123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
    {
      id: "4",
      name: "An Le",
      email: "andrew123@gmail.com",
    },
  ]);

  // useEffect(() => {
  //   const fetchUserList = async () => {
  //     try {
  //       const response = await userAPI.getAll();
  //       console.log("response: ", response);

  //       setUserList(response);
  //     } catch (error) {
  //       console.log("Fail to fetch: ", error);
  //     }
  //   };

  //   fetchUserList();
  // }, []);

  // console.log("userList: ", userList);

  return (
    <Box display="flex">
      <Sidebar />
      <Box m={10}>
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <SectionHeader>My Projects</SectionHeader>
            <CreateProjectModal
              participantList={userList.map((a) => {
                const userInfo = a.name + " (" + a.email + ")";
                return { value: a.id, label: userInfo };
              })}
            />
          </Flex>

          <ProjectGrid />

          <SectionHeader>Assigned to me</SectionHeader>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
