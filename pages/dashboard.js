import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
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
import StoryGrid from "../components/common/StaticBoard/StaticBoardDashboard";
import MainContainer from "../components/layout/MainContainer";
import { digFind } from "../utils/object";

const Dashboard = ({ authToken }) => {
  // Get current user from cookies
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5("EmChiXemAnhLa_#BanNhauMaThoi")
  );

  const PAGE_LIMIT_PROJECT = 4;
  const PAGE_LIMIT_STORY = 2;

  //----------------Project Setting-----------------------//
  // Init projectData & its pagination
  const [projectData, setProjectData] = useState({
    projectList: [],
    totalProject: 0,
  });
  const [currentProjectPage, setCurrentProjectPage] = useState(1);

  // Init current project name
  const [currentProjectName, setCurrentProjectName] = useState(
    projectData.projectList.length > 0 ? projectData.projectList[0].title : ""
  );

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
    limit: PAGE_LIMIT_PROJECT,
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
      // Set current project name
      setCurrentProjectName(projects[0].title);
      // Set current story
      let currentFilter = filterStory;
      currentFilter.page = 0;
      currentFilter.projectId = projects[0].id;
      setFilterStory(currentFilter);
      fetchStory(filterStory);
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
    limit: PAGE_LIMIT_STORY,
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
    let currentFilter = filterStory;
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
      currentFilter.sortProp = "created_date";
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
    setCurrentProjectName(
      projectData.projectList.find((x) => x.id === id).title
    );
    fetchStory(filterStory);
  };

  // Listen on update
  useEffect(() => {
    fetchUpdatedProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentProjectPage]);

  useEffect(() => {
    fetchUpdatedStory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          pb={5}
          gap={8}
          wrap={"wrap"}
        >
          <Flex gap={6}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                placeholder="Search for project name"
                color={useColorModeValue("#031d46", "#fffdfe")}
                value={searchProjectValue}
                onChange={handleProjectChange}
              />
            </InputGroup>
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
          <NoItem icon={GoProject}>No project found!</NoItem>
        )}
        <ProjectGrid
          projectData={projectData.projectList}
          fetchUpdatedProject={fetchUpdatedProject}
          fetchProjectStory={fetchProjectStory}
        />
        <Pagination
          currentPage={currentProjectPage}
          totalCount={projectData.totalProject}
          pageSize={PAGE_LIMIT_PROJECT} // Fixed size
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
          pb={5}
          gap={8}
          wrap={"wrap"}
        >
          <Flex gap={6}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                // eslint-disable-next-line react/no-children-prop
                children={<Search2Icon color="gray.300" />}
              />
              <Input
                placeholder="Search for story name"
                color={useColorModeValue("#031d46", "#fffdfe")}
                value={searchStoryValue}
                onChange={handleStoryChange}
              />
            </InputGroup>
            <Button
              onClick={handleSearchStory}
              color={useColorModeValue("#031d46", "#fffdfe")}
              px={10}
            >
              Search
            </Button>
          </Flex>

          <Select
            width="auto"
            onChange={(e) => handleSortStory(e.target.value)}
            color={useColorModeValue("#031d46", "#fffdfe")}
            defaultValue="pointDsc"
          >
            <option value="pointDsc">Point: High to Low</option>
            <option value="pointAsc">Point: Low to High</option>
            <option value="timeDsc">Recently Assigned</option>
            <option value="timeAsc">Oldest Assigned</option>
          </Select>
        </Flex>

        <Box h="100%">
          {projectData.projectList.length === 0 ? (
            <NoItem icon={GoChecklist}>
              No task found in any project. Enjoy your day!
            </NoItem>
          ) : (
            <StoryGrid
              storyData={storyData}
              projectTitle={currentProjectName}
              currentStoryPage={currentStoryPage}
              setCurrentStoryPage={setCurrentStoryPage}
              pageLimit={PAGE_LIMIT_STORY}
            />
          )}
        </Box>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Dashboard;
