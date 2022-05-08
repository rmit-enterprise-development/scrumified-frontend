import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import jsonwebtoken from "jsonwebtoken";
import md5 from "md5";
import cookies from "next-cookies";
import Head from "next/head";
import { useState } from "react";
import { LoggedUserProvider } from "../components/common/LoggedUserProvider";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import NoItem from "../components/dashboard/NoItem/NoItem";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import MainContainer from "../components/layout/MainContainer";
import useFetchDashboard from "../hooks/useFetchDashboard";
import { GoProject, GoChecklist } from "react-icons/go";

const Dashboard = ({ authToken }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5("EmChiXemAnhLa_#BanNhauMaThoi")
  );

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  const handleSearch = () => {
    // Submit search
    console.log(value);
  };

  const { projectList, taskList } = useFetchDashboard(loggedUser);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <SectionHeader>My Projects</SectionHeader>

        <Flex
          justifyContent="space-between"
          alignItems="center"
          pb={3}
          gap={2}
          wrap={"wrap"}
        >
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

        {projectList.length === 0 && (
          <NoItem icon={GoProject}>
            No project found. Please start create your first project!
          </NoItem>
        )}

        <ProjectGrid projectData={projectList} taskData={taskList} />

        <SectionHeader>Assigned to me</SectionHeader>

        {taskList.length === 0 && (
          <NoItem icon={GoChecklist}>No task remained. Enjoy your day</NoItem>
        )}
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Dashboard;
