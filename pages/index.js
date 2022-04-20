import { Container } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useStateRef from "react-usestateref";
import MainForm from "../components/home/Account/MainForm";
import HomeNavBar from "../components/home/NavBar/MainNavBar";
import FirstSection from "../components/home/Section/FirstSection";
import SecondSection from "../components/home/Section/SecondSection";

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [typedEmail, setTypedEmail, typedEmailRef] = useStateRef("");

  // Check if user has already logged in -> override path HOME to DASHBOARD
  const router = useRouter();

  return (
    <>
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

      {/* Main content (currently testing only) */}
      {/* First section */}
      <FirstSection
        typedEmail={typedEmail}
        setIsRegistering={setIsRegistering}
        setIsSigningIn={setIsSigningIn}
        setTypedEmail={setTypedEmail}
      />

      <SecondSection />

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
