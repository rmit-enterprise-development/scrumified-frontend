import { Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import MainContainer from "../components/layout/MainContainer";
import EditProfileModal from "../components/profile/EditProfileModal";
import ProfileCard from "../components/profile/ProfileCard";
import LogOutButton from "../components/profile/LogOutButton";
import jsonwebtoken from "jsonwebtoken";
import md5 from "md5";
import cookies from "next-cookies";
import EditPasswordModal from "../components/profile/EditPasswordModal";


const Profile = ( {authToken} ) => {
  const [loggedUser, setLoggedUser] = useState({});
  console.log("loggedUser: ", loggedUser);
  
  useEffect(() => {
    try {
      const currentUser = jsonwebtoken.verify(
        authToken,
        md5("EmChiXemAnhLa_#BanNhauMaThoi")
      );
      setLoggedUser(currentUser);
    } catch (error) {
      console.log(error);
    }
  }, [authToken]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <MainContainer user={loggedUser}>
        <SectionHeader>Profile</SectionHeader>

        <Flex justifyContent="space-around" mt={10}>
          <ProfileCard
            fname={loggedUser.firstName}
            lname={loggedUser.lastName}
            email={loggedUser.email}
            bio="Em hay roi xa anh ta di!"
          />
          <Flex flexDir='column' justifyContent='space-around'>
            <EditProfileModal
              id={loggedUser.id}
              fname={loggedUser.firstName}
              lname={loggedUser.lastName}
              email={loggedUser.email}
            />
            <EditPasswordModal
              id={loggedUser.id}
              fname={loggedUser.firstName}
              lname={loggedUser.lastName}
              email={loggedUser.email}
            />
            <LogOutButton id={loggedUser.id} />
          </Flex>
        </Flex>
    
        <SectionHeader>My Projects</SectionHeader>
      </MainContainer>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Profile;
