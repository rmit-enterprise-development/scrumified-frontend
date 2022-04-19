import { useState } from 'react';
import Head from 'next/head';
import HomeNavBar from '../components/home/NavBar/MainNavBar';
import FirstSection from '../components/home/Section/FirstSection';
import SecondSection from '../components/home/Section/SecondSection';
import ThirdSection from '../components/home/Section/ThirdSection';
import MainForm from '../components/home/Account/MainForm';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import useStateRef from 'react-usestateref';

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [typedEmail, setTypedEmail, typedEmailRef] = useStateRef('');

  return (
    <Flex
      w="full"
      h="full"
      direction="column"
      transition="all 0.4s linear"
      bg={useColorModeValue('#fff', '#031e49')}
    >
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      <HomeNavBar
        setIsSigningIn={setIsSigningIn}
        setIsRegistering={setIsRegistering}
      />
      {/* Pop up when Register button is clicked */}
      <MainForm
        isSigningIn={isSigningIn}
        setIsSigningIn={setIsSigningIn}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        setTypedEmail={setTypedEmail}
        typedEmail={typedEmail}
        typedEmailRef={typedEmailRef}
      />

      {/* First section */}
      <FirstSection
        typedEmail={typedEmail}
        setIsRegistering={setIsRegistering}
        setIsSigningIn={setIsSigningIn}
        setTypedEmail={setTypedEmail}
      />

      {/* Second section */}
      <SecondSection />

      {/* Third section */}
      <ThirdSection />

    </Flex>
  );
}
