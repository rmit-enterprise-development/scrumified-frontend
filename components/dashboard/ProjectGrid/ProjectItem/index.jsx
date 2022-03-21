import { Box, SimpleGrid, Text } from "@chakra-ui/react";

const ProjectItem = ({ name, author, createdTime, color }) => {
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
    >
      <Box boxSizing="border-box" bgColor={color} w={5} />
      <Box p={2}>
        <Text fontSize="xl" fontWeight="bold">
          {name}
        </Text>
        <Text as="i" fontSize="sm">
          {author}
          <br />
        </Text>
        <Text as="i" fontSize="sm">
          {createdTime}
        </Text>
      </Box>
    </Box>
  );
};

export default ProjectItem;
