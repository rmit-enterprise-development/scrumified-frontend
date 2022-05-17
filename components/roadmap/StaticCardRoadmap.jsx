import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { BadgeColor, Category } from "../../config/constants";

const StaticCardRoadmap = ({ card }) => {
  const textColor = useColorModeValue("#031d46", "#fffdfe");

  return (
    <Box
      boxSizing="border-box"
      borderRadius="1rem"
      overflow="hidden"
      bg={useColorModeValue("#fffdfe", "#405A7D")}
      color={textColor}
      p={4}
      boxShadow="base"
      _hover={{
        boxShadow: "0 0 5px 5px #e6e6e7",
        transition: "all 0.4s linear",
      }}
      display="flex"
      justifyContent="space-between"
    >
      <Heading fontSize="lg" isTruncated color={textColor}>
        {card.userStory}
      </Heading>

      <Flex alignItems={"center"}>
        <Badge
          colorScheme={BadgeColor[card.category]}
          borderRadius={"4px"}
          marginRight={2}
        >
          {Category[card.category]}
        </Badge>

        <Circle size="25px" bg="red.500" color="white" p={"10px"}>
          {card.point}
        </Circle>
      </Flex>
    </Box>
  );
};

export default StaticCardRoadmap;
