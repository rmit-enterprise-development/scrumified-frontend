import {
  Badge,
  Box,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";

const StaticCardRoadmap = ({ sprint }) => {
  const textColor = useColorModeValue("#031d46", "#fffdfe");

  return (
    <Box
      boxSizing="border-box"
      borderRadius="1rem"
      overflow="hidden"
      bg={useColorModeValue("#fffdfe", "#405A7D")}
      color={textColor}
      mb={4}
      p={4}
      boxShadow="base"
      _hover={{
        boxShadow: "0 0 5px 5px #e6e6e7",
        transition: "all 0.4s linear",
      }}
      minH="6rem"
      display="flex"
      justifyContent="space-between"
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="lg" isTruncated>
          {"Sprint " + sprint.goal}
        </Heading>
      </Flex>
      <Flex
        mt={3}
        justifyContent="space-between"
        alignItems={"center"}
        alignContent={"center"}
      >
        <Flex alignItems={"center"}>
          <Badge
            colorScheme={"green"}
            borderRadius={"4px"}
            marginRight={2}
          >
            {sprint.status}
          </Badge>
        </Flex>
      </Flex>
    </Box>
  );
};

export default StaticCardRoadmap;