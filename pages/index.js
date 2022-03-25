import Head from 'next/head';
import HomeNavBar from '../components/home/NavBar/MainNavBar';
import FirstSection from '../components/home/Section/FirstSection';
import { useState } from 'react';
import AccountPopUp from '../components/home/Account/AccountPopUp';
import { Container } from '@chakra-ui/react';

export default function Home() {
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar setIsSigningIn={setIsSigningIn} />

      {/* Pop up when sign in button is clicked */}
      <AccountPopUp isSigningIn={isSigningIn} setIsSigningIn={setIsSigningIn} />

      {/* Main content (currently testing only) */}
      {/* First section */}
      <FirstSection />

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
