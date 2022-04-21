import { Box, Flex } from "@chakra-ui/react";
import Head from "next/head";
import { useState } from "react";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import CreateProjectModal from "../components/dashboard/CreateProjectModal/CreateProjectModal";
import ProjectGrid from "../components/dashboard/ProjectGrid/ProjectGrid";
import MainContainer from "../components/layout/MainContainer";

const Dashboard = () => {
  // useEffect(() => {
  //   const fetchUserList = async () => {
  //     try {
  //       const response = await userAPI.getAll();
  //       console.log("response: ", response);

  //       setUserList(response);
  //     } catch (error) {
  //       console.log("Fail to fetch: ", error);
  //     }
  //   };

  //   fetchUserList();
  // }, []);

  // console.log("userList: ", userList);

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <MainContainer>
        <Flex justifyContent="space-between" alignItems="center">
          <SectionHeader>My Projects</SectionHeader>

          <CreateProjectModal
            participantList={userList.map((a) => {
              const userInfo = a.name + " (" + a.email + ")";
              return { value: a.id, label: userInfo };
            })}
          />
        </Flex>

        <ProjectGrid />

        <SectionHeader>Assigned to me</SectionHeader>
      </MainContainer>
    </>
  );
};

export default Dashboard;
