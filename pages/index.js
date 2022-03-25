import Head from 'next/head';
import HomeNavBar from '../components/home/NavBar/MainNavBar';
import FirstSection from '../components/home/Section/FirstSection';
import { useState } from 'react';
import AccountRegister from '../components/home/Account/Register';
import { Container } from '@chakra-ui/react';

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar setIsRegistering={setIsRegistering} />

      {/* Pop up when sign in button is clicked */}
      <AccountRegister
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
      />

      {/* Main content (currently testing only) */}
      {/* First section */}
      <FirstSection setIsRegistering={setIsRegistering}/>

      {/* Dummy section */}
      <Container
        as="main"
        p={0}
        bg="red.500"
        maxW="full"
        w="100vw"
        h="100vh"
      ></Container>
    </>
  );
}
