import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { Draggable } from "react-beautiful-dnd";
import CardModal from "./CardModal";

const Card = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

  const colorScheme = "red" + ".500";
  return (
    <Draggable draggableId={"" + props.card.id} index={props.index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => {
            onOpen();
          }}
          boxSizing="border-box"
          borderRadius="1rem"
          overflow="hidden"
          bg={"white"}
          mb={4}
          boxShadow="base"
        >
          <Flex bgColor={"red.500"} padding={"2px"} alignItems="center">
            <Text p={2} color="white">
              Assignees:
            </Text>
            <Avvvatars value="Minh Pham" size="25" />
          </Flex>
          <Box p={2}>
            <Flex alignItems={"center"}>
              <Heading fontSize="xl" isTruncated>
                {props.card.userStory}
              </Heading>
            </Flex>
            <Flex mt={4} justifyContent="space-between" alignItems={"center"}>
              <Badge colorScheme="green" borderRadius={'4px'} shadow="inner">
                {props.card.category}
              </Badge>

              <Circle size="25px" bg={colorScheme} color="white" p={'10px'} shadow="inner">
                {props.card.point}
              </Circle>
            </Flex>
          </Box>
          <CardModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            // data={data}
            // setData={setData}
            // card={props.card}
          />
        </Box>
      )}
    </Draggable>
  );
};

export default Card;
