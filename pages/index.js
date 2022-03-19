import Head from 'next/head';
import { Container } from '@chakra-ui/react';
import HomeNavBar from '../components/home/NavBar';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar />

      {/* Main content */}
      <Container
        as="main"
        p={0}
        bg="#fff"
        maxW="full"
        w="100vw"
        h="100vh"
      ></Container>

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
