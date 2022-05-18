import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { GoChecklist } from "react-icons/go";
import NoItem from "../NoItem/NoItem";
import { StaticCardBacklog } from "./StaticCard/StaticCard";

const StaticBoardBacklog = ({
  storyList,
  participants,
  sprintId,
  isActive,
}) => {
  return (
    <Flex
      flexDir={"column"}
      dir="column"
      boxSizing="border-box"
      bgGradient={useColorModeValue(
        "linear(gray.50 0%, gray.100 100%)",
        "linear(blue.800 0%, blue.900 100%)"
      )}
      boxShadow="base"
      borderRadius={"1rem"}
      py={2.5}
      transition="all 0.5s linear"
      px={4}
      mb={5}
      h="77vh"
      minW="300px"
    >
      <Text
        textAlign={"center"}
        fontSize={"1.5rem"}
        fontWeight={"bold"}
        color={useColorModeValue("#031d46", "#fffdfe")}
        p={4}
      >
        Result Filtered Stories
      </Text>

      <Flex
        flexDirection={"column"}
        flexGrow={1}
        padding={"2"}
        overflow="auto"
        h="20rem"
      >
        {storyList && storyList.length === 0 && (
          <NoItem icon={GoChecklist}>No story found!</NoItem>
        )}
        {storyList.map((story) => (
          <StaticCardBacklog
            key={story.id}
            card={story}
            participants={participants}
            sprintId={sprintId}
            isActive={isActive}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default StaticBoardBacklog;
