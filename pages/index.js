import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import HomeNavBar from '../components/home/NavBar/MainNavBar';

import FirstSection from '../components/home/Section/FirstSection';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar />

      {/* Main content (currently testing only) */}
      {/* First section */}
      <FirstSection />

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
