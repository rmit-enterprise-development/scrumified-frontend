import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useEffect, useState } from "react";
import userAPI from "../api/services/userAPI";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import MainContainer from "../components/layout/MainContainer";
import { digFind } from "../utils/object";

const Dashboard = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const handleSearch = () => {
    // Submit search
    console.log(value);
  };

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await userAPI.getAll();
        const data = digFind(response, "userDtoList");

        setUserList(data);
      } catch (error) {
        console.log("Fail to fetch: ", error);
      }
    };

    fetchUserList();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <SectionHeader>My Projects</SectionHeader>

          <CreateProjectModal
            participantList={userList.map((a) => {
              const userInfo =
                a.firstName + " " + a.lastName + " (" + a.email + ")";
              return { value: a.id, label: userInfo };
            })}
          />
        </Flex>

        <Flex justifyContent="space-between" alignItems="center" pb={2}>
          <Flex gap={2}>
            <Input
              placeholder="Search for project name"
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={value}
              onChange={handleChange}
            ></Input>
            <Button
              onClick={handleSearch}
              color={useColorModeValue("#031d46", "#fffdfe")}
            >
              Search
            </Button>
          </Flex>
          <Flex gap={1}>
            <IconButton
              aria-label="Previous"
              icon={
                <ArrowBackIcon
                  color={useColorModeValue("#031d46", "#fffdfe")}
                />
              }
            ></IconButton>
            <IconButton
              aria-label="Next"
              icon={
                <ArrowForwardIcon
                  color={useColorModeValue("#031d46", "#fffdfe")}
                />
              }
            ></IconButton>
          </Flex>
        </Flex>

        <ProjectGrid />

        <SectionHeader>Assigned to me</SectionHeader>
      </MainContainer>
    </>
  );
};

export default Dashboard;
