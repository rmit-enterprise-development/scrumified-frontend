import { Flex, useBreakpointValue } from '@chakra-ui/react';
import jsonwebtoken from 'jsonwebtoken';
import md5 from 'md5';
import cookies from 'next-cookies';
import Head from 'next/head';
import { AiOutlineFieldTime } from 'react-icons/ai';
import { LoggedUserProvider } from '../components/common/LoggedUserProvider';
import NoItem from '../components/common/NoItem/NoItem';
import SectionHeader from '../components/common/SectionHeader/SectionHeader';
import MainContainer from '../components/layout/MainContainer';
import EditPasswordModal from '../components/profile/EditPasswordModal';
import EditProfileModal from '../components/profile/EditProfileModal';
import LogOutButton from '../components/profile/LogOutButton';
import ProfileCard from '../components/profile/ProfileCard';

const Profile = ({ authToken }) => {
  const loggedUser = jsonwebtoken.verify(
    authToken,
    md5('EmChiXemAnhLa_#BanNhauMaThoi')
  );
  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Profile</title>
      </Head>

      <MainContainer user={loggedUser}>
        <SectionHeader>Profile</SectionHeader>

        <Flex
          justifyContent="space-around"
          mt={10}
          pb={6}
          flexDir={useBreakpointValue({ base: 'column', md: 'row' })}
        >
          <ProfileCard
            id={loggedUser.logUserId}
            fname={loggedUser.firstName}
            lname={loggedUser.lastName}
            email={loggedUser.email}
            description={loggedUser.description}
          />

          <Flex
            flexDir="column"
            justifyContent="space-around"
            mt={useBreakpointValue({ base: '2rem', md: '' })}
            gap={useBreakpointValue({ base: '1rem', md: '' })}
          >
            <EditProfileModal
              id={loggedUser.logUserId}
              fname={loggedUser.firstName}
              lname={loggedUser.lastName}
              email={loggedUser.email}
              description={loggedUser.description}
            />
            <EditPasswordModal
              id={loggedUser.logUserId}
              email={loggedUser.email}
            />
            <LogOutButton id={loggedUser.id} />
          </Flex>
        </Flex>

        <SectionHeader>Activity Analytics</SectionHeader>
        <NoItem icon={AiOutlineFieldTime}>Coming Soon!</NoItem>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || '' } };
}

export default Profile;
