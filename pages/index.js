import Head from 'next/head';
import { Container, useColorModeValue, useColorMode } from '@chakra-ui/react';
import HomeNavBar from '../components/home/NavBar';

export default function Home() {
  const navContent = ['Home', 'Features', 'How it works', 'Testinomial'];
  const getStartedTextColor = useColorModeValue('white', 'black');
  const { colorMode } = useColorMode();

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>
      <Container maxW="5xl" p={0}>
        <HomeNavBar
          navContent={navContent}
          getStartedTextColor={getStartedTextColor}
          colorMode={colorMode}
        />
      </Container>
    </>
  );
}
