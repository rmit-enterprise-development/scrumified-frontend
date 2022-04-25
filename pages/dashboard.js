import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import CreateProjectModal from '../components/dashboard/CreateProjectModal/CreateProjectModal';
import ProjectGrid from '../components/dashboard/ProjectGrid/ProjectGrid';
import MainContainer from '../components/layout/MainContainer';

import cookies from 'next-cookies';
import { LoggedUserProvider } from '../components/common/LoggedUserProvider';

const Dashboard = ({ authToken }) => {
  const [userList, setUserList] = useState([
    {
      id: '1',
      name: 'Minh Pham',
      email: 'pcminh0505@gmail.com',
    },
    {
      id: '3',
      name: 'Thach Ho',
      email: 'thachho@123@gmail.com',
    },
    {
      id: '2',
      name: 'Khang Nguyen',
      email: 'khangnguyen111101@gmail.com',
    },
    {
      id: '5',
      name: 'Duong Nguyen',
      email: 'duongnguyen123@gmail.com',
    },
    {
      id: '4',
      name: 'An Le',
      email: 'andrew123@gmail.com',
    },
  ]);
  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <SectionHeader>My Projects</SectionHeader>

          <CreateProjectModal
            participantList={userList.map((a) => {
              const userInfo = a.name + ' (' + a.email + ')';
              return { value: a.id, label: userInfo };
            })}
          />
        </Flex>

        <ProjectGrid />

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
