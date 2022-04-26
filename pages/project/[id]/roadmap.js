import Head from "next/head";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";

import cookies from "next-cookies";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";

const Roadmap = ({ authToken }) => {
  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Roadmap</title>
      </Head>

      <MainContainer>
        <SectionHeader>Project Roadmap</SectionHeader>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Roadmap;
