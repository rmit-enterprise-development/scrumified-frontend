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
  useToast,
  Skeleton,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import storyAPI from "../../api/services/storyAPI";
import { BadgeColor, Category } from "../../config/constants";
import textUtils from "../../utils/text";
import CardModal from "./CardModal";

const Card = ({
  participants,
  card,
  disableModal,
  sprintId,
  isActive,
  ...props
}) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
  let bg = useColorModeValue("white", "#405A7D");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getUserInfoValue = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return (
        textUtils.getFirstLetters(user.firstName + " " + user.lastName) +
        user.id
      );
    }
  };
  const getUserInfoFull = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return `${user.firstName} ${user.lastName}`;
    }
  };

  const handleUpdateStatus = async () => {
    if (sprintId) {
      setIsSubmitting(true);
      try {
        const response = await storyAPI.putStory(
          // Specialized params for add/remove story from sprint
          card.id,
          {
            replaceStoryId: null,
            sprintId: card.status === "backlog" ? sprintId : null,
            status: card.status === "backlog" ? "todo" : "backlog",
          },
          {
            isDragged: true,
          }
        );
        if (response) {
          toast({
            title: "Update story successfully!",
            status: "success",
            duration: 1500,
            isClosable: true,
          });
        }
      } catch (error) {
        console.log(error);
        toast({
          title: "Update story failed!",
          status: "error",
          duration: 1500,
          isClosable: true,
        });
      }
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
            minW="250px"
          >
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Heading fontSize="lg" isTruncated>
                {card.userStory}
              </Heading>

              {sprintId && !isActive && (
                <WrapItem>
                  <Tooltip
                    label={
                      card.status === "backlog"
                        ? "Add to sprint"
                        : "Remove from sprint"
                    }
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
                        handleUpdateStatus();
                      }}
                      aria-label="Search database"
                      icon={
                        card.status === "backlog" ? (
                          <AddIcon color="green" />
                        ) : (
                          <MinusIcon color="red" />
                        )
                      }
                      disabled={isSubmitting}
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
              gap={3}
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
