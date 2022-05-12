import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { GoChecklist } from "react-icons/go";
import NoItem from "../NoItem/NoItem";
import StaticCard from "./StaticCard/StaticCard";

const StaticBoardBacklog = ({ storyList, participants }) => {
  return (
    <Flex
      flexDir={"column"}
      dir="column"
      boxSizing="border-box"
      overflow="hidden"
      bgGradient={useColorModeValue(
        "linear(gray.50 0%, gray.100 100%)",
        "linear(blue.800 0%, blue.900 100%)"
      )}
      boxShadow="base"
      borderRadius={"1rem"}
      py={2.5}
      px={4}
    >
      <Text
        textAlign={"center"}
        fontSize={"xl"}
        fontWeight={"bold"}
        color={useColorModeValue("#031d46", "#fffdfe")}
        p={4}
      >
        Result Filtered Stories
      </Text>

      <Flex flexDirection="column" flexGrow={1} padding={2}>
        {storyList.length === 0 && (
          <NoItem icon={GoChecklist}>No story found!</NoItem>
        )}
        {storyList.map((story) => (
          <StaticCard
            key={story.id}
            card={story}
            isBacklog={true}
            participants={participants}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default StaticBoardBacklog;
