import Head from "next/head";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";

const Roadmap = () => {
  return (
    <>
      <Head>
        <title>Roadmap</title>
      </Head>

      <MainContainer>
        <SectionHeader>Project Roadmap</SectionHeader>
      </MainContainer>
    </>
  );
};

export default Roadmap;
