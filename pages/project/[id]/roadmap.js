import Head from "next/head";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";
import GanttChart from "../../../components/roadmap/GanttChart";
import projectAPI from "../../../api/services/projectAPI";
import cookies from "next-cookies";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import { useRouter } from "next/router";
import { useToast, Skeleton, Text, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import NoItem from "../../../components/common/NoItem/NoItem";
import { BsBarChartSteps } from "react-icons/bs";
import CompletedSprint from "../../../components/roadmap/CompletedSprint";

const Roadmap = ({ authToken }) => {
  const { asPath } = useRouter();
  const projectId = asPath.split("/")[2];
  const toast = useToast();
  const [allSprints, setAllSprints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSprints = async () => {
    setIsLoading(true);
    try {
      const response = await projectAPI.getAllSprints(projectId, {
        includePercentage: true,
      });
      const data = await response.data;
      setAllSprints(data);
      setIsLoading(false);
    } catch (error) {
      toast({
        title: "Get Sprint",
        description: typeof error !== "string" ? "Server error" : error,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getSprints();
  }, []);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Roadmap</title>
      </Head>

      <MainContainer>
        <SectionHeader>Project Roadmap</SectionHeader>
        <Skeleton isLoaded={!isLoading}>
          {allSprints.length > 0 ? (
            <GanttChart data={allSprints} />
          ) : (
            <NoItem icon={BsBarChartSteps}>No sprint created!</NoItem>
          )}
        </Skeleton>

        <SectionHeader>Archived Sprints</SectionHeader>
        <Skeleton isLoaded={!isLoading}>
          <Flex cursor="pointer" gap={2} flexDir="column">
            {allSprints.map(
              (sprint) =>
                sprint.status === "done" && (
                  <CompletedSprint key={sprint.id} sprint={sprint} />
                )
            )}
          </Flex>
        </Skeleton>
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return { props: { authToken: auth || "" } };
}

export default Roadmap;
