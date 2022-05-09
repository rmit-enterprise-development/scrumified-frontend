import {
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
import MainContainer from "../components/layout/MainContainer";
import { digFind } from "../utils/object";

const Dashboard = ({ authToken }) => {
  // Get current user from cookies
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5('EmChiXemAnhLa_#BanNhauMaThoi')
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
  const handleProjectChange = (event) =>
    setSearchProjectValue(event.target.searchProjectValue);

  // Filter
  const [filterProject, setFilterProject] = useState({
    key: '',
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
      const projects = digFind(data, 'content');

      setProjectData({
        projectList: projects,
        totalProject: data.totalElements,
      });
    } catch (error) {
      console.log('Fail to fetch: ', error);
    }
  };

  // Submit search name project
  const handleSearchProject = () => {
    let currentFilter = filterProject;
    if (searchProjectValue) {
      currentFilter.key = searchProjectValue;
      setFilterProject(currentFilter);

      fetchProject(filterProject);
    } else {
      currentFilter.key = '';
      setFilterProject(currentFilter);
      fetchProject(filterProject);
    }
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
  // Input sort story
  const [sortStoryValue, setSortStoryValue] = useState("");
  const handleStoryChange = (event) =>
    setSortStoryValue(event.target.sortStoryValue);

  // Filter
  const [filterStory, setFilterStory] = useState({
    key: "",
    page: currentStoryPage - 1,
    limit: PAGE_LIMIT,
    sortProp: "points",
    ascending: false,
  });

  // Populate Story data
  const fetchStory = async (filter) => {
    // try {
    //   const response = await userAPI.getAllStorys(
    //     loggedUser.logUserId,
    //     filter
    //   );
    //   const data = response.data;
    //   const projects = digFind(data, "content");
    //   setProjectData({
    //     projectList: projects,
    //     totalProject: data.totalElements,
    //   });
    // } catch (error) {
    //   console.log("Fail to fetch: ", error);
    // }
  };

  // Submit search name project
  const handleSearchStory = () => {
    let currentFilter = filterStory;
    if (searchStoryValue) {
      currentFilter.key = searchStoryValue;
      setFilterStory(currentFilter);

      fetchStory(filterStory);
    } else {
      currentFilter.key = "";
      setFilterStory(currentFilter);
      fetchStory(filterStory);
    }
  };

  const handleSortStory = (type) => {
    let currentFilter = filterStory;

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
          fetchUpdate={fetchUpdatedProject}
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
          alignItems="center"
          py={5}
          gap={8}
          wrap={"wrap"}
        >
          <Flex gap={2} pb={2}>
            <Input
              placeholder="Search for story name"
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={searchStoryValue}
              width="auto"
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
          >
            <option value="timeDsc">Recently Assigned</option>
            <option value="timeAsc">Oldest Assigned</option>
            <option value="pointDsc">Point: High to Low</option>
            <option value="pointAsc">Point: Low to High</option>
          </Select>
        </Flex>

        {/* {storyData.length === 0 && ( */}
        <NoItem icon={GoChecklist}>
          Click the red button of one project to view your task(s).
        </NoItem>
        {/* )} */}

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
  return { props: { authToken: auth || '' } };
}

export default Dashboard;
