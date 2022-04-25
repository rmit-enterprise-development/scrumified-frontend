import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
} from '@chakra-ui/react';
import jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import CreateProjectModal from '../components/dashboard/CreateProjectModal/CreateProjectModal';
import ProjectGrid from '../components/dashboard/ProjectGrid/ProjectGrid';
import MainContainer from '../components/layout/MainContainer';
import useFetchDashboard from '../hooks/useFetchDashboard';

import cookies from 'next-cookies';
import { LoggedUserProvider } from '../components/common/LoggedUserProvider';

const Dashboard = ({ authToken }) => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [loggedUser, setLoggedUser] = useState({});
  console.log('loggedUser: ', loggedUser);
  const [value, setValue] = useState('');
  const handleChange = (event) => setValue(event.target.value);

  const handleSearch = () => {
    // Submit search
    console.log(value);
  };

  const { projectList, taskList } = useFetchDashboard(loggedUser);

  useEffect(() => {
    try {
      const currentUser = jsonwebtoken.verify(
        authToken,
        md5('EmChiXemAnhLa_#BanNhauMaThoi')
      );
      setLoggedUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  }, [authToken]);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer user={loggedUser}>
        <SectionHeader>My Projects</SectionHeader>

        <Flex justifyContent="space-between" alignItems="center" pb={2}>
          <Flex gap={2}>
            <Input
              placeholder="Search for project name"
              color={useColorModeValue('#031d46', '#fffdfe')}
              value={value}
              onChange={handleChange}
            ></Input>
            <Button
              onClick={handleSearch}
              color={useColorModeValue('#031d46', '#fffdfe')}
            >
              Search
            </Button>
            <IconButton
              aria-label="Previous"
              icon={
                <ArrowBackIcon
                  color={useColorModeValue('#031d46', '#fffdfe')}
                />
              }
            ></IconButton>
            <IconButton
              aria-label="Next"
              icon={
                <ArrowForwardIcon
                  color={useColorModeValue('#031d46', '#fffdfe')}
                />
              }
            ></IconButton>
          </Flex>

          <CreateProjectModal />
        </Flex>

        <ProjectGrid projectData={projectList} taskData={taskList} />

        <SectionHeader>Assigned to me</SectionHeader>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || '' } };
}

export default Dashboard;
