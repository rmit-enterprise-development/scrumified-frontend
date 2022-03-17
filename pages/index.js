import Head from "next/head";
import { Container } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import ProjectGrid from "../components/ProjectGrid";
import SectionHeader from "../components/SectionHeader";

export default function Home() {
  const navContent = ["Home", "Features", "How it works", "Testinomial"];

  return (
    <>
      <Head>
        <title>Home - Scrumified</title>
      </Head>
      <Container maxW="5xl" p={0}>
        <NavBar navContent={navContent} />

        <SectionHeader>Project List</SectionHeader>
        <ProjectGrid />

        <SectionHeader>Assigned Tasks</SectionHeader>
      </Container>
    </>
  );
}
