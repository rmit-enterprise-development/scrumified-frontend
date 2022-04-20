import { Box, Flex, Text } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { RouterPage } from "../../../../config/router";
import textUtils from "../../../../utils/text";
import NumberButton from "./NumberButton";

const ProjectItem = ({ id, name, author, createdTime, color, openTasks }) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${id}`,
    });
  };

  const colorScheme = color + ".500";
  if (name.length > 20) {
    name = textUtils.truncate(name);
  }
  return (
    <Box
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
          <Text fontWeight="bold" pl={2}>
            {name}
          </Text>
        </Flex>

        <Text>Created at: {createdTime}</Text>
        <Text>Owned by: {author}</Text>

        <Flex alignItems="center" pt={5}>
          <Text pr={2}>My task</Text>
          <NumberButton bgColor={color}>{openTasks}</NumberButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProjectItem;
