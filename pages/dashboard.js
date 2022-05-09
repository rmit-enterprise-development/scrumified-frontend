import {
  Button,
  Flex,
  Input,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
import cookies from 'next-cookies';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { GoChecklist, GoProject } from 'react-icons/go';
import userAPI from '../api/services/userAPI';
import { LoggedUserProvider } from '../components/common/LoggedUserProvider';
import NoItem from '../components/common/NoItem/NoItem';
import Pagination from '../components/common/Pagination/Pagination';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import CreateProjectModal from '../components/dashboard/CreateProjectModal/CreateProjectModal';
import ProjectGrid from '../components/dashboard/ProjectGrid/ProjectGrid';
import MainContainer from '../components/layout/MainContainer';
import { digFind } from '../utils/object';

const Dashboard = ({ authToken }) => {
  // Get current user from cookies
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5('EmChiXemAnhLa_#BanNhauMaThoi')
  );

  const PAGE_LIMIT = 4;

  // Init projectData & its pagination
  const [projectData, setProjectData] = useState({
    projectList: [],
    totalProject: 0,
  });
  const [currentProjectPage, setCurrentProjectPage] = useState(1);

  // Init storyData & its pagination
  const [storyData, setStoryData] = useState({
    storyList: [],
    totalStory: 0,
  });
  const [currentStoryPage, setCurrentStoryPage] = useState(1);

  //----------------Project Setting-----------------------//
  // Input search Project
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);

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
  const handleSearch = () => {
    let currentFilter = filterProject;
    if (value) {
      currentFilter.key = value;
      setFilterProject(currentFilter);

      fetchProject(filterProject);
    } else {
      currentFilter.key = '';
      setFilterProject(currentFilter);
      fetchProject(filterProject);
    }
  };

  const fetchUpdate = () => {
    let currentFilter = filterProject;
    currentFilter.page = currentProjectPage - 1;
    setFilterProject(currentFilter);

    fetchProject(filterProject);
  };

  //----------------Story Setting-----------------------//

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
          justifyContent={useBreakpointValue({
            base: 'center',
            md: 'space-between',
          })}
          alignItems="center"
          py={5}
          gap={8}
          wrap={'wrap'}
        >
          <Flex gap={6}>
            <Input
              placeholder="Search for project name"
              color={useColorModeValue('#031d46', '#fffdfe')}
              value={value}
              onChange={handleChange}
            ></Input>
            <Button
              onClick={handleSearch}
              color={useColorModeValue('#031d46', '#fffdfe')}
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

        {/* {storyData.length === 0 && ( */}
        <NoItem icon={GoChecklist}>
          Click the red button of one project to view your task(s).
        </NoItem>
        {/* )} */}
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || '' } };
}

export default Dashboard;
