import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { RouterPage } from "../../../../config/router";
import { truncate } from "../../../../utils/truncate";
import NumberButton from "./NumberButton";

const ProjectItem = ({ id, name, author, createdTime, color, openTasks }) => {
  const handlePushProjectDetail = () => {
    Router.push({
      pathname: `${RouterPage.PROJECT}/${id}`,
    });
  };

  const colorScheme = color + ".500";
  if (name.length > 20) {
    name = truncate(name);
  }
  return (
    <Box
      boxSizing="border-box"
      borderWidth="2px"
      borderRadius="5%"
      display="flex"
      overflow="hidden"
      borderColor="grey"
      w={250}
      h={200}
      cursor="pointer"
      onClick={handlePushProjectDetail}
    >
      <Box boxSizing="border-box" bgColor={colorScheme} w={5} />
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
          <br />
        </Text>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Text as="i" fontSize="sm">
            My opened task:
          </Text>
          <NumberButton bgColor={color}>{openTasks}</NumberButton>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectItem;
