import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { useContext, useState } from "react";
import storyAPI from "../../../../api/services/storyAPI";
import { BadgeColor, Category } from "../../../../config/constants";
import { RouterPage } from "../../../../config/router";
import textUtils from "../../../../utils/text";
import CardModal from "../../../workspace/CardModal";
import { LoggedUserContext } from "../../LoggedUserProvider";

const StaticCardBacklog = ({ card, participants, sprintId, isActive }) => {
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const getUserInfoValue = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return (
        textUtils.getFirstLetters(user.firstName + " " + user.lastName) +
        user.logUserId
      );
    }
  };
  const getUserInfoFull = (id) => {
    if (participants.length > 0) {
      const user = Object.values(participants).find((p) => p.id === id);
      return `${user.firstName} ${user.lastName}`;
    }
  };

  const textColor = useColorModeValue("#031d46", "#fffdfe");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isAdded, setIsAdded] = useState(false);
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
    <Box
      cursor="pointer"
      boxSizing="border-box"
      borderRadius="1rem"
      overflow="hidden"
      bg={useColorModeValue("#fffdfe", "#405A7D")}
      color={textColor}
      mb={4}
      p={4}
      boxShadow="base"
      _hover={{
        boxShadow: "0 0 5px 5px #e6e6e7",
        transition: "all 0.4s linear",
      }}
      minH="6rem"
      minW="250px"
      onClick={() => {
        onOpen();
      }}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="lg" isTruncated>
          {card.userStory}
        </Heading>

        {sprintId && !isActive && (
          <WrapItem>
            <Tooltip
              label={!isAdded ? "Add to sprint" : "Remove from sprint"}
              placement={"left-start"}
            >
              <IconButton
                isRound={true}
                size={"xs"}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                bgColor={useColorModeValue("gray.200", "#fffdfe")}
                _hover={{ opacity: 0.8 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAdded(!isAdded);
                  handleUpdateStatus();
                }}
                aria-label="Search database"
                icon={
                  !isAdded ? (
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
      >
        <Flex alignItems={"center"}>
          <Text paddingRight={2}>Assignees:</Text>
          <WrapItem>
            <Tooltip
              label={getUserInfoFull(card.assignId)}
              placement={"right-start"}
            >
              <Box>
                <Avvvatars value={getUserInfoValue(card.assignId)} size="25" />
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

      <CardModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        prevCard={card}
        participants={participants}
        isCard={true}
        color={textColor}
      />
    </Box>
  );
};

const StaticCard = ({ card }) => {
  const user = useContext(LoggedUserContext);
  const userInfo =
    textUtils.getFirstLetters(user.firstName + " " + user.lastName) +
    user.logUserId;
  return (
    <Box
      cursor="pointer"
      boxSizing="border-box"
      borderRadius="1rem"
      overflow="hidden"
      bg={useColorModeValue("#fffdfe", "#405A7D")}
      color={useColorModeValue("#031d46", "#fffdfe")}
      mb={4}
      p={4}
      boxShadow="base"
      _hover={{
        boxShadow: "0 0 5px 5px #e6e6e7",
        transition: "all 0.4s linear",
      }}
      minH="6rem"
      onClick={() => {
        Router.push({
          pathname: `${RouterPage.PROJECT}/${card.projectId}${RouterPage.BACKLOG}`,
        });
      }}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="lg" isTruncated>
          {card.userStory}
        </Heading>
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
              label={user.firstName + " " + user.lastName}
              placement={"right-start"}
            >
              <Box>
                <Avvvatars value={userInfo} size="25" />
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
  );
};

export { StaticCard, StaticCardBacklog };
