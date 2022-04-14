import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { RouterPage } from "../../../../config/router";

const ProjectItem = ({ id, name, author, createdTime, color, openTasks }) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${id}`,
    });
  };

  return (
    <Box
      boxSizing="border-box"
      borderWidth="2px"
      borderRadius="5%"
      display="flex"
      overflow="hidden"
      borderColor="grey"
      w={200}
      h={200}
      onClick={handlePushProjectDetail}
    >
      <Box boxSizing="border-box" bgColor={color} w={5} />
      <Box p={2}>
        <Box pb={2}>
          <Avvvatars style="shape" value={id} />
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
        </Box>

        <Text as="i" fontSize="sm">
          Owned by: {author}
          <br />
        </Text>
        <Text as="i" fontSize="sm">
          Created at: {createdTime}
        </Text>
        <Text as="i" fontSize="sm">
          My opened task: 2
        </Text>
      </Box>
    </Box>
  );
};

export default ProjectItem;
