import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { RouterPage } from "../../../../config/router";
import textUtils from "../../../../utils/text";
import NumberButton from "./NumberButton";

const ProjectItem = ({ id, name, author, createdTime, color, openTasks }) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${id}${RouterPage.BACKLOG}`,
    });
  };

  const colorScheme = color + ".500";
  if (name.length > 20) {
    name = textUtils.truncate(name);
  }
  return (
    <Box
      borderColor={useColorModeValue("#fffdfe", "#2d4046")}
      borderWidth="1px"
      borderRadius="10%"
      boxShadow="xl"
      display="flex"
      overflow="hidden"
      w={250}
      h={150}
      cursor="pointer"
      onClick={handlePushProjectDetail}
    >
      <Box w={5} bg={colorScheme} />
      <Box p={2}>
        <Flex pb={2} alignItems="center">
          <Avvvatars style="shape" value={id} />
          <Text
            fontWeight="bold"
            pl={2}
            color={useColorModeValue("#031d46", "#fffdfe")}
          >
            {name}
          </Text>
        </Flex>

        <Text color={useColorModeValue("#031d46", "#fffdfe")}>
          Created at: {createdTime}
        </Text>
        <Text color={useColorModeValue("#031d46", "#fffdfe")}>
          Owned by: {author}
        </Text>

        <Flex alignItems="center" pt={4}>
          <Text pr={2} color={useColorModeValue("#031d46", "#fffdfe")}>
            My task
          </Text>
          <NumberButton bgColor={color}>{openTasks}</NumberButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectItem;
