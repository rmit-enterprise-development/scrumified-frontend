import { AddIcon, Icon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useDisclosure,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { Draggable } from "react-beautiful-dnd";
import textUtils from "../../utils/text";
import CardModal from "./CardModal";

const Card = ({ participants, card, ...props }) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
  let bg = useColorModeValue("white", "#405A7D");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  let btnColor = "black";

  const { isOpen, onOpen, onClose } = useDisclosure();
  const colorScheme = "red" + ".500";
  const getUserInfoValue = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return textUtils.getFirstLetters(user.firstName + " " + user.lastName);
    }
  };
  const getUserInfoFull = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return `${user.firstName} ${user.lastName}`;
    }
  };
  return (
    <Draggable draggableId={"" + card.id} index={props.index}>
      {(provided) => (
        <>
          <Box
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={(e) => {
              onOpen();
            }}
            boxSizing="border-box"
            borderRadius="1rem"
            overflow="hidden"
            bg={bg}
            color={color}
            mb={4}
            p={4}
            boxShadow="base"
            _hover={{
              boxShadow: "0 0 5px 5px #e6e6e7",
              transition: "all 0.4s linear",
            }}
            minH="6rem"
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Heading fontSize="lg" isTruncated>
                {card.userStory}
              </Heading>

              <WrapItem>
                <Tooltip label={"Add to sprint"} placement={"left-start"}>
                  <IconButton
                    isRound={true}
                    size={"xs"}
                    bgColor={btnBg}
                    _hover={{ opacity: 0.8 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("DitMe");
                    }}
                    aria-label="Search database"
                    icon={<AddIcon color={btnColor} />}
                  />
                </Tooltip>
              </WrapItem>
            </Flex>

            <Flex
              mt={3}
              justifyContent="space-between"
              alignItems={"center"}
              alignContent={"center"}
            >
              <Flex alignItems={"center"}>
                <Text paddingRight={2}>Assignees:</Text>
                <WrapItem>
                  <Tooltip
                    label={getUserInfoFull(card.assignId)}
                    placement={"right-start"}
                  >
                    <Box>
                      <Avvvatars
                        value={getUserInfoValue(card.assignId)}
                        size="25"
                      />
                    </Box>
                  </Tooltip>
                </WrapItem>
              </Flex>
              <Flex alignItems={"center"}>
                <Badge colorScheme="green" borderRadius={"4px"} marginRight={2}>
                  {card.category}
                </Badge>

                <Circle size="25px" bg={colorScheme} color="white" p={"10px"}>
                  {card.point}
                </Circle>
              </Flex>
            </Flex>
          </Box>
          <CardModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            color={color}
            prevCard={card}
            participants={participants}
            isCard={true}
          />
        </>
      )}
    </Draggable>
  );
};

export default Card;
