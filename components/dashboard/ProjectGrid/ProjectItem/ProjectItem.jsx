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
import { RouterPage } from "../../../../config/router";
import ModifyButton from "./ModifyProject/ModifyButton";
import NumberButton from "./NumberButton";

const ProjectItem = ({
  id,
  name,
  author,
  createdTime,
  color,
  openTasks,
  participants,
  fetchUpdate,
}) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${id}${RouterPage.BACKLOG}`,
    });
  };
  const colorScheme = color + ".500";
  // if (name.length > 20) {
  //   name = textUtils.truncate(name);
  // }
  return (
    <Flex
      borderColor="#2d4046"
      borderWidth="1px"
      borderRadius="1rem"
      _hover={{
        boxShadow:
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
      }}
      overflow="hidden"
      cursor="pointer"
      onClick={handlePushProjectDetail}
    >
      <Box w="5%" bg={colorScheme} />
      <Flex p={2} flexDir="column" justifyContent="space-between" w="100%">
        <Box>
          <Flex pb={2} justifyContent="space-between">
            <Flex alignItems="center" flexWrap="wrap">
              <Avvvatars style="shape" value={id} />
              <Text
                fontWeight="bold"
                pl={2}
                color={useColorModeValue("#031d46", "#fffdfe")}
              >
                {name}
              </Text>
            </Flex>

            <ModifyButton
              id={id}
              name={name}
              participants={participants}
              fetchUpdate={fetchUpdate}
            />
          </Flex>

          <Text color={useColorModeValue("#031d46", "#fffdfe")}>
            Created at: {createdTime}
          </Text>
          <Text color={useColorModeValue("#031d46", "#fffdfe")}>
            Owned by: {author}
          </Text>
        </Box>

        <Flex alignItems="center" pt={4}>
          <Text pr={2} color={useColorModeValue("#031d46", "#fffdfe")}>
            My task
          </Text>

          <NumberButton>{openTasks}</NumberButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProjectItem;
