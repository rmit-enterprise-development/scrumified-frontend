import { Flex, Box, Text, useColorModeValue } from "@chakra-ui/react";
import { GoChecklist } from "react-icons/go";
import NoItem from "../NoItem/NoItem";
import Pagination from "../Pagination/Pagination";
import StoryCardDashboard from "./StaticCard/StaticCard";

const StaticBoardDashboard = ({
  projectTitle,
  storyData,
  currentStoryPage,
  setCurrentStoryPage,
  pageLimit,
}) => {
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
        Project: {projectTitle}
      </Text>

      {storyData.storyList.length === 0 && (
        <NoItem icon={GoChecklist}>No task found in this project!</NoItem>
      )}
      {storyData.storyList.map((story) => (
        <StoryCardDashboard key={story.id} card={story} />
      ))}
      <Pagination
        currentPage={currentStoryPage}
        totalCount={storyData.totalStory}
        pageSize={pageLimit} // Fixed size
        onPageChange={(page) => {
          setCurrentStoryPage(page);
        }}
      />
    </Flex>
  );
};

export default StaticBoardDashboard;
