import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import MainContainer from "../components/layout/MainContainer";
import useFetchDashboard from "../hooks/useFetchDashboard";

const Dashboard = () => {
  const currentUser = {
    id: 1,
  };
  // const [currentPage, setCurrentPage] = useState(1);

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const handleSearch = () => {
    // Submit search
    console.log(value);
  };

  const { projectList, taskList } = useFetchDashboard(currentUser.id);
  console.log("taskList: ", taskList);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <SectionHeader>My Projects</SectionHeader>

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

          <CreateProjectModal />
        </Flex>

        <ProjectGrid projectData={projectList} taskData={taskList} />

        <SectionHeader>Assigned to me</SectionHeader>
      </MainContainer>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Dashboard;
