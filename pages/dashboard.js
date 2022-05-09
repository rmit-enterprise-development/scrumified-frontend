import { Button, Flex, Input, useColorModeValue } from "@chakra-ui/react";
import jsonwebtoken from "jsonwebtoken";
import md5 from "md5";
import cookies from "next-cookies";
import Head from "next/head";
import { useEffect, useState } from "react";
import { GoChecklist, GoProject } from "react-icons/go";
import userAPI from "../api/services/userAPI";
import { LoggedUserProvider } from "../components/common/LoggedUserProvider";
import NoItem from "../components/common/NoItem/NoItem";
import Pagination from "../components/common/Pagination/Pagination";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import MainContainer from "../components/layout/MainContainer";
import useFetchStory from "../hooks/useFetchStory";
import { digFind } from "../utils/object";

const Dashboard = ({ authToken }) => {
  // Get current user from cookies
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5("EmChiXemAnhLa_#BanNhauMaThoi")
  );

  // Init projectData & its pagination
  const [projectData, setProjectData] = useState({
    projectList: [],
    totalProject: 0,
  });
  const [currentProjectPage, setCurrentProjectPage] = useState(1);
  const PAGE_LIMIT = 4;

  // Input search Project
  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  // Filter
  const [filterProject, setFilterProject] = useState({
    key: "",
    page: currentProjectPage - 1,
    limit: PAGE_LIMIT,
  });

  // Populate project data
  const fetchProject = async (filter) => {
    try {
      const response = await userAPI.getAllProjects(
        loggedUser.logUserId,
        filter
      );
      const data = response.data;
      const projects = digFind(data, "content");

      setProjectData({
        projectList: projects,
        totalProject: data.totalElements,
      });
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  // Submit search name project
  const handleSearch = () => {
    let currentFilter = filterProject;
    if (value) {
      currentFilter.key = value;
      setFilterProject(currentFilter);

      fetchProject(filterProject);
    } else {
      currentFilter.key = "";
      setFilterProject(currentFilter);
      fetchProject(filterProject);
    }
  };

  const storyList = useFetchStory(loggedUser);

  const fetchUpdate = () => {
    let currentFilter = filterProject;
    currentFilter.page = currentProjectPage - 1;
    setFilterProject(currentFilter);

    fetchProject(filterProject);
  };

  useEffect(() => {
    fetchUpdate();
  }, [currentProjectPage]);

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
          </Flex>

          <CreateProjectModal />
        </Flex>

        {projectData.projectList.length === 0 && (
          <NoItem icon={GoProject}>
            No project found. Please start create your first project!
          </NoItem>
        )}

        <ProjectGrid
          projectData={projectData.projectList}
          taskData={storyList}
          fetchUpdate={fetchUpdate}
        />

        <Pagination
          currentPage={currentProjectPage}
          totalCount={projectData.totalProject}
          pageSize={PAGE_LIMIT} // Fixed size
          onPageChange={(page) => {
            setCurrentProjectPage(page);
          }}
        />

        <SectionHeader>Assigned to me</SectionHeader>

        {storyList.length === 0 && (
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
