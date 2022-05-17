import Head from "next/head";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";
import GanttChart from "../../../components/roadmap/GanttChart";
import projectAPI from "../../../api/services/projectAPI";
import cookies from "next-cookies";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import { useRouter } from "next/router";
import { useToast, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NoItem from "../../../components/common/NoItem/NoItem";
import { GoInfo } from "react-icons/go";
import CompletedSprints from "../../../components/roadmap/CompletedSprints";

const Roadmap = ({ authToken }) => {
  const { asPath } = useRouter();
  const projectId = asPath.split("/")[2];
  const toast = useToast();
  const [allSprints, setAllSprints] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const sprintData = async () => {
    try {
      const response = await projectAPI.getAllSprints(projectId, {
        includePercentage: true,
      });
      const json = await response.data;

      setAllSprints(json);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Get Sprint",
        description: typeof error !== "string" ? "Server error" : error,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    sprintData();
  }, []);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Roadmap</title>
      </Head>

      <MainContainer>
        <SectionHeader>Project Roadmap</SectionHeader>
        {isLoading ? (
          <Skeleton height="40px"></Skeleton>
        ) : allSprints.length > 0 ? (
          <GanttChart data={allSprints} />
        ) : (
          <NoItem icon={GoInfo}>No sprint created</NoItem>
        )}

        {isLoading ? (
          <Skeleton height="40px"></Skeleton>
        ) : (
          <CompletedSprints sprintList={allSprints} />
        )}
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Roadmap;
