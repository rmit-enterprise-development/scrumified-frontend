import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
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
import StoryCardDashboard from "../components/dashboard/StoryCardDashboard/StoryCardDashboard";
import MainContainer from "../components/layout/MainContainer";
import { digFind } from "../utils/object";

const Dashboard = ({ authToken }) => {
  // Get current user from cookies
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5("EmChiXemAnhLa_#BanNhauMaThoi")
  );

  const PAGE_LIMIT = 4;

  //----------------Project Setting-----------------------//
  // Init projectData & its pagination
  const [projectData, setProjectData] = useState({
    projectList: [],
    totalProject: 0,
  });
  const [currentProjectPage, setCurrentProjectPage] = useState(1);

  // Input search Project
  const [searchProjectValue, setSearchProjectValue] = useState("");
  const handleProjectChange = (event) => {
    setSearchProjectValue(event.target.value);
    if (event.target.value === "") {
      let currentFilter = filterProject;
      // Reset default
      currentFilter.page = 0;
      currentFilter.key = "";
      setFilterProject(currentFilter);
      fetchProject(filterProject);
    }
  };

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
  const handleSearchProject = () => {
    let currentFilter = filterProject;
    // Reset default
    currentFilter.page = 0;
    currentFilter.key = searchProjectValue;
    setFilterProject(currentFilter);
    fetchProject(filterProject);
  };

  const fetchUpdatedProject = () => {
    let currentFilter = filterProject;
    currentFilter.page = currentProjectPage - 1;
    setFilterProject(currentFilter);
    fetchProject(filterProject);
  };

  //----------------Story Setting-----------------------//
  // Init storyData & its pagination
  const [storyData, setStoryData] = useState({
    storyList: [],
    totalStory: 0,
  });
  console.log("storyData: ", storyData);
  const [currentStoryPage, setCurrentStoryPage] = useState(1);
  // Input search story
  const [searchStoryValue, setSearchStoryValue] = useState("");
  const handleStoryChange = (event) => {
    if (event.target.value === "") {
      let currentFilter = filterStory;
      // Reset default
      currentFilter.page = 0;
      currentFilter.key = "";
      setFilterStory(currentFilter);
      fetchStory(filterStory);
    }
    setSearchStoryValue(event.target.value);
  };

  // Filter
  const [filterStory, setFilterStory] = useState({
    key: "",
    page: currentStoryPage - 1,
    limit: PAGE_LIMIT,
    sortProp: "points",
    ascending: false,
    projectId:
      projectData.projectList.length > 0 ? projectData.projectList[0].id : -1,
  });

  // Populate Story data
  const fetchStory = async (filter) => {
    try {
      const response = await userAPI.getAllStories(
        loggedUser.logUserId,
        filter
      );
      const data = response.data;
      const stories = digFind(data, "content");
      setStoryData({
        storyList: stories,
        totalStory: data.totalElements,
      });
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  // Submit search name project
  const handleSearchStory = () => {
    let currentFilter = filterProject;
    // Reset default
    currentFilter.page = 0;
    currentFilter.key = searchStoryValue;
    setFilterStory(currentFilter);
    fetchStory(filterStory);
  };

  const handleSortStory = (type) => {
    let currentFilter = filterStory;
    // Reset default
    currentFilter.page = 0;
    currentFilter.key = "";

    if (type.includes("Dsc")) {
      currentFilter.ascending = true;
    } else {
      currentFilter.ascending = false;
    }

    if (type.includes("time")) {
      currentFilter.sortProp = "createdDate";
    } else {
      currentFilter.sortProp = "points";
    }

    setFilterStory(currentFilter);
    fetchStory(filterStory);
  };

  const fetchUpdatedStory = () => {
    let currentFilter = filterStory;
    currentFilter.page = currentStoryPage - 1;
    setFilterStory(currentFilter);

    fetchStory(filterStory);
  };

  const fetchProjectStory = (id) => {
    let currentFilter = filterStory;
    currentFilter.page = 0;
    currentFilter.projectId = id;
    setFilterStory(currentFilter);

    fetchStory(filterStory);
  };

  // Listen on update
  useEffect(() => {
    fetchUpdatedProject();
  }, [currentProjectPage]);

  useEffect(() => {
    fetchUpdatedStory();
  }, [currentStoryPage]);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <SectionHeader>My Projects</SectionHeader>
        <Flex
          justifyContent={useBreakpointValue({
            base: "center",
            md: "space-between",
          })}
          alignItems="center"
          py={5}
          gap={8}
          wrap={"wrap"}
        >
          <Flex gap={6}>
            <Input
              placeholder="Search for project name"
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={searchProjectValue}
              onChange={handleProjectChange}
            ></Input>
            <Button
              onClick={handleSearchProject}
              color={useColorModeValue("#031d46", "#fffdfe")}
              px={10}
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
          fetchUpdatedProject={fetchUpdatedProject}
          fetchProjectStory={fetchProjectStory}
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
        <Flex
          justifyContent={useBreakpointValue({
            base: "center",
            md: "space-between",
          })}
          py={5}
          gap={8}
          wrap={"wrap"}
        >
          <Flex gap={6}>
            <Input
              placeholder="Search for story name"
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={searchStoryValue}
              onChange={handleStoryChange}
            ></Input>
            <Button
              onClick={handleSearchStory}
              color={useColorModeValue("#031d46", "#fffdfe")}
            >
              Search
            </Button>
          </Flex>

          <Select
            placeholder="Sort"
            width="auto"
            onChange={(e) => handleSortStory(e.target.value)}
            color={useColorModeValue("#031d46", "#fffdfe")}
          >
            <option value="timeDsc" selected="selected">
              Recently Assigned
            </option>
            <option value="timeAsc">Oldest Assigned</option>
            <option value="pointDsc">Point: High to Low</option>
            <option value="pointAsc">Point: Low to High</option>
          </Select>
        </Flex>

        <Box h="100%">
          {storyData.storyList.length === 0 && (
            <NoItem icon={GoChecklist}>
              No task on this project. You are good to go!
            </NoItem>
          )}
          {storyData.storyList.map((story) => (
            <StoryCardDashboard key={story.id} card={story} />
          ))}
        </Box>

        <Pagination
          currentPage={currentStoryPage}
          totalCount={storyData.totalStory}
          pageSize={PAGE_LIMIT} // Fixed size
          onPageChange={(page) => {
            setCurrentStoryPage(page);
          }}
        />
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Dashboard;
