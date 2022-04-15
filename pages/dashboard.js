import { Box, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { HiOutlinePlusSm } from "react-icons/hi";
import ProjectGrid from "../components/dashboard/ProjectGrid";
import SectionHeader from "../components/dashboard/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar.tsx";
import userAPI from "../api/services/userAPI";

const Dashboard = () => {
  // const { response, error, loading } = useAxios(userAPI.getOne(1));

  // const { call } = useAxios(userAPI.getOne(1));

  // if (loading) {
  //   console.log("Loading...");
  // } else {
  //   console.log("Get data successfully");
  //   console.log("Getting user with ID 1 response: ", response);
  // }
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await userAPI.getAll();
        console.log(response);
      } catch (error) {
        console.log("Fail to fetch: ", error);
      }
    };

    fetchUserList();
  }, []);

  const mockUser = {
    firstName: "HoHo",
    lastName: "Uncle",
    email: "hochiminhmuonnam@gmail.com",
    password: "dcmtestpasswordthoynha",
  };

  const registerUser = async (submitData) => {
    // const requestOptions = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: submitData,
    // };

    console.log("submitData: ", submitData);
    try {
      const response = await userAPI.register(submitData);
      console.log(response);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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

          {/* Only for mock API user: Move this into other section later  */}
          <Button onClick={() => registerUser(mockUser)}>
            Click to register user
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
