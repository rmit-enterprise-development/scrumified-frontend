import { AddIcon, Icon, MinusIcon, RepeatClockIcon } from "@chakra-ui/icons";
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
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import storyAPI from "../../api/services/storyAPI";
import { BadgeColor, Category } from "../../config/constants";
import textUtils from "../../utils/text";
import CardModal from "./CardModal";

const Card = ({ participants, card, disableModal, ...props }) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
  let bg = useColorModeValue("white", "#405A7D");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");

  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleUpdateStatus = async () => {
    try {
      const response = storyAPI.putStory(card.id);
    } catch (error) {
      console.log(error);
    }
  };
  const [isAdded, setIsAdded] = useState(false);
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

              {!disableModal && (
                <WrapItem>
                  <Tooltip
                    label={!isAdded ? "Add to sprint" : "Remove from sprint"}
                    placement={"left-start"}
                  >
                    <IconButton
                      isRound={true}
                      size={"xs"}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      bgColor={btnBg}
                      _hover={{ opacity: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsAdded(!isAdded);
                        console.log("DitMe"); // Set action
                      }}
                      aria-label="Search database"
                      icon={
                        card.status === "backlog" ? (
                          <AddIcon color="green" />
                        ) : (
                          <MinusIcon color="red" />
                        )
                      }
                    />
                  </Tooltip>
                </WrapItem>
              )}
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
            disableModal={disableModal}
          />
        </>
      )}
    </Draggable>
  );
};

export default Card;
