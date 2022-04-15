import Head from "next/head";
import HomeNavBar from "../components/home/NavBar/MainNavBar";
import FirstSection from "../components/home/Section/FirstSection";
import { useState } from "react";
import MainForm from "../components/home/Account/MainForm";
import { Container } from "@chakra-ui/react";
import useStateRef from "react-usestateref";

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [typedEmail, setTypedEmail, typedEmailRef] = useStateRef("");

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>

      {/* Nav Bar */}
      <HomeNavBar
        setIsSigningIn={setIsSigningIn}
        setIsRegistering={setIsRegistering}
      />

      {/* Pop up when Register button is clicked */}
      <MainForm
        setIsSigningIn={setIsSigningIn}
        isRegistering={isRegistering}
        setIsRegistering={setIsRegistering}
        setTypedEmail={setTypedEmail}
        typedEmail={typedEmail}
        typedEmailRef={typedEmailRef}
      />

      {/* Pop up when Sign In button is clicked */}

      {/* Main content (currently testing only) */}
      {/* First section */}
      <FirstSection
        typedEmail={typedEmail}
        setIsRegistering={setIsRegistering}
        setTypedEmail={setTypedEmail}
      />

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
