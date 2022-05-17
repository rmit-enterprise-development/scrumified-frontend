import { ChevronDownIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Collapse,
  Flex,
  Heading,
  Icon,
  Skeleton,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { GoTasklist } from "react-icons/go";
import sprintAPI from "../../api/services/sprintAPI";
import StaticCardRoadmap from "./StaticCardRoadmap";

const CompletedSprint = ({ sprint }) => {
  const { isOpen, onToggle } = useDisclosure();
  const textColor = useColorModeValue("#031d46", "#fffdfe");
  const [completedStories, setCompletedStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCompletedStories = async () => {
    setIsLoading(true);
    onToggle();
    if (isOpen) {
      setCompletedStories([]);
    } else {
      try {
        const response = await sprintAPI.getAllStories(sprint.id);
        const json = response.data;
        const data = Object.values(json);
        setCompletedStories(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Flex
        onClick={getCompletedStories}
        bg={useColorModeValue("#eeeeee", "#1C345B")}
        cursor="pointer"
        display="flex"
        alignItems="center"
        p={2}
        borderColor="#2d4046"
        justifyContent="space-between"
      >
        <Flex alignItems="center">
          <Heading fontSize="lg" color={textColor} isTruncated>
            {"Sprint " + sprint.goal}
          </Heading>

          <Badge colorScheme={"green"} borderRadius={"4px"} ml={3}>
            Completed
          </Badge>
        </Flex>

        <Icon
          as={isOpen ? ChevronDownIcon : ChevronRightIcon}
          w={6}
          h={6}
          color={textColor}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        {/* {doneSprints && doneSprints.length > 0 ? (
            doneSprints.map((sprint) => (
              <StaticCardRoadmap key={sprint} sprint={sprint} />
            ))
          ) : (
            <NoItem icon={GoInfo}>No Sprint Completed</NoItem>
          )}
           */}
        <Skeleton
          isLoaded={!isLoading}
          height={
            (completedStories.length > 0 ? 80 * completedStories.length : 80) +
            "px"
          }
        >
          <Flex
            flexDir={"column"}
            dir="column"
            boxSizing="border-box"
            bgGradient={useColorModeValue(
              "linear(gray.50 0%, gray.100 100%)",
              "linear(blue.800 0%, blue.900 100%)"
            )}
            boxShadow="base"
            py={2.5}
            transition="all 0.5s linear"
            px={4}
            gap={2}
          >
            {completedStories.length === 0 ? (
              <Flex
                h="60px"
                flexDir="column"
                justifyContent="center"
                alignItems="center"
                pb={2}
              >
                <Icon fontSize="4xl" color="grey" as={GoTasklist} pt={2} />
                <Text as="i" color="grey" textAlign={"center"}>
                  No completed story found!
                </Text>
              </Flex>
            ) : (
              completedStories.map((card) => (
                <StaticCardRoadmap key={card.id} card={card} />
              ))
            )}
          </Flex>
        </Skeleton>
      </Collapse>
    </>
  );
};

export default CompletedSprint;
