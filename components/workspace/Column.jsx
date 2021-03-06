import { Flex, Skeleton, Tag, Text, useColorModeValue } from "@chakra-ui/react";
import { Droppable } from "react-beautiful-dnd";
import { GoTasklist } from "react-icons/go";
import { AiOutlineStop } from "react-icons/ai";
import NoItem from "../common/NoItem/NoItem";

const Column = ({
  title,
  id,
  cardList,
  columnColor,
  isLoading,
  sprintStatus,
  isDragDisabled,
}) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
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
      mb={4}
      h="77vh"
      minW="350px"
    >
      <Flex alignItems={"center"}>
        <Text
          textAlign={"center"}
          fontSize={"1.5rem"}
          fontWeight={"bold"}
          color={color}
          p={4}
        >
          {title}
        </Text>

        <Tag
          textAlign={"center"}
          borderRadius={"0.5rem"}
          size={"6"}
          px={"6px"}
          py={"4px"}
          bgColor={columnColor}
          color={"white"}
        >
          {cardList.length === 1 ? `1 card` : `${cardList.length} cards`}
        </Tag>
      </Flex>

      <Droppable droppableId={id} isDropDisabled={isDragDisabled}>
        {(provided) => (
          <Flex
            flexDirection={"column"}
            flexGrow={1}
            ref={provided.innerRef}
            {...provided.droppableProps}
            padding={"2"}
            overflow="auto"
          >
            {cardList &&
              cardList.length === 0 &&
              (isDragDisabled ? (
                <NoItem icon={AiOutlineStop}>
                  Please start sprint to drag and drop
                </NoItem>
              ) : sprintStatus === "inProgress" ? (
                <></>
              ) : (
                <NoItem icon={GoTasklist}>
                  No item found. Create some inside backlog!
                </NoItem>
              ))}
            {cardList}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
