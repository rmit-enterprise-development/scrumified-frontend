import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { useState } from 'react';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import MainContainer from '../components/layout/MainContainer';
import EditProfileModal from '../components/profile/EditProfileModal';
import ProfileCard from '../components/profile/ProfileCard';

import cookies from 'next-cookies';
import {
  LoggedUserProvider,
} from '../components/common/LoggedUserProvider';

const Profile = ({ authToken }) => {
  const [user, setUser] = useState({
    id: '1',
    fname: 'Minh',
    lname: 'Pham',
    email: 'pcminh0505@gmail.com',
    bio: 'Minh dep dzai',
  });

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Profile</title>
      </Head>

      <MainContainer>
        <SectionHeader>Profile</SectionHeader>

        <Flex justifyContent="space-around" mt={10}>
          <ProfileCard
            fname={user.fname}
            lname={user.lname}
            email={user.email}
            bio={user.bio}
          />
          <EditProfileModal
            id={user.id}
            fname={user.fname}
            lname={user.lname}
            email={user.email}
            bio={user.bio}
          />
        </Flex>

        <SectionHeader>My Projects</SectionHeader>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || '' } };
}

export default Profile;
