import {
  Flex,
  Box,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GoChecklist } from "react-icons/go";
import NoItem from "../../common/NoItem/NoItem";
import Pagination from "../../common/Pagination/Pagination";
import StaticCard from "./StaticCard/StaticCard";

const StaticBoardDashboard = ({
  projectTitle,
  storyData,
  currentStoryPage,
  setCurrentStoryPage,
  pageLimit,
}) => {
  return (
    <Flex
      // maxH="17.5rem"
      h="100%"
      mb={useBreakpointValue({ base: "2rem", md: 0 })}
      flexDir={"column"}
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
        pb={4}
      >
        Project: {projectTitle}
      </Text>

      {storyData.storyList.length === 0 && (
        <NoItem icon={GoChecklist}>No task found in this project!</NoItem>
      )}
      {storyData.storyList.map((story) => (
        <StaticCard key={story.id} card={story} />
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
