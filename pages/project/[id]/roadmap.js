import Head from "next/head";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";
import GanttChart from "../../../components/roadmap/GanttChart";
import projectAPI from "../../../api/services/projectAPI";
import cookies from "next-cookies";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import { useRouter } from "next/router";
import { GiConsoleController } from "react-icons/gi";
import { useToast, Skeleton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Roadmap = ({ authToken }) => {
  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "Duration" },
    { type: "number", label: "Percentage done" },
    { type: "string", lable: "Dependencies" },
  ];

  const { asPath } = useRouter();
  const projectId = asPath.split("/")[2];
  const toast = useToast();
  const [allSprints, setAllSprints] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const sprintData = async () => {
    try {
      setIsLoading(true);
      const response = await projectAPI.getAllSprints(projectId, {
        includePercentage: true,
      });
      const json = await response.data;

      const sprints = [];
      let sprint;
      for (let i = 0; i < response.data.length; i++) {
        sprint = [
          "" + json[i].id,
          "Sprint: " + json[i].goal,
          null,
          new Date(json[i].startDate * 1000),
          new Date(json[i].endDate * 1000),
          null,
          json[i].completePercentage,
          null,
        ];
        sprints.push(sprint);
      }
      console.log(sprint);
      setAllSprints(sprints);
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
        ) : (
          <GanttChart data={[columns, ...allSprints]} />
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
