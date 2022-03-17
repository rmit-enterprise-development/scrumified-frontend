import { Box, SimpleGrid, Text } from "@chakra-ui/react";

const ProjectItem = ({ name, description, createdTime, lastUpdatedTime }) => {
  return (
    <Box bg="tomato" w="100%" p={5} color="white">
      <Text>{name}</Text>
      <Text>{description}</Text>
      <Text>{createdTime} </Text>
      <Text>{lastUpdatedTime}</Text>
    </Box>
  );
};

export default ProjectItem;
