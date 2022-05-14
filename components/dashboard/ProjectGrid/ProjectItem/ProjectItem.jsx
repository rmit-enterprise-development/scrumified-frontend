import {
  Box,
  Flex,
  Icon,
  IconButton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { useContext, useEffect, useState } from "react";
import userAPI from "../../../../api/services/userAPI";
import { RouterPage } from "../../../../config/router";
import { LoggedUserContext } from "../../../common/LoggedUserProvider";
import ModifyButton from "./ModifyProject/ModifyButton";
import NumberButton from "./NumberButton";

const ProjectItem = ({
  project,
  color,
  fetchProjectStory,
  fetchUpdatedProject,
}) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${project.id}${RouterPage.BACKLOG}`,
    });
  };
  const colorScheme = color + ".500";

  const user = useContext(LoggedUserContext);

  // Duplicated code here: Just to get number of tasks
  const [openTask, setOpenTask] = useState(0);
  const getNumberOfStories = async () => {
    try {
      const params = { projectId: project.id };
      const response = await userAPI.getAllStories(user.logUserId, params);
      const data = response.data;
      setOpenTask(data.totalElements);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  useEffect(() => {
    getNumberOfStories();

    return () => {
      setOpenTask(0); // Reduce memory leaked warning? Idk :<
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex
      borderColor="#2d4046"
      borderWidth="1px"
      borderRadius="1rem"
      _hover={{
        boxShadow:
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
      }}
      transition="all 0.2s linear"
      overflow="hidden"
      cursor="pointer"
      onClick={handlePushProjectDetail}
    >
      <Box w="5%" bg={colorScheme} />
      <Flex
        py={3}
        px={5}
        flexDir="column"
        justifyContent="space-between"
        bg={useColorModeValue("#fffdfe", "#405A7D")}
        w="100%"
      >
        <Box>
          <Flex pb={2} justifyContent="space-between">
            <Flex alignItems="center" flexWrap="wrap">
              <Avvvatars style="shape" value={project.id} />
              <Text
                fontWeight="bold"
                pl={2}
                color={useColorModeValue("#031d46", "#fffdfe")}
              >
                {project.title}
              </Text>
            </Flex>

            {user.logUserId === project.ownerId && (
              <ModifyButton
                id={project.id}
                name={project.title}
                participants={project.participants}
                fetchUpdatedProject={fetchUpdatedProject}
              />
            )}
          </Flex>

          <Text color={useColorModeValue("#031d46", "#fffdfe")}>
            Created at:&nbsp;
            {new Date(project.createdDate * 1000).toLocaleDateString("en-IN")}
          </Text>
          <Text color={useColorModeValue("#031d46", "#fffdfe")}>
            Owned by: {project.owner.firstName + " " + project.owner.lastName}
          </Text>
        </Box>

        <Flex alignItems="center" pt={4}>
          <Text pr={2} color={useColorModeValue("#031d46", "#fffdfe")}>
            Assigned task
          </Text>

          <NumberButton
            id={project.id}
            fetchProjectStory={fetchProjectStory}
            openTask={openTask}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectItem;
