import { AddIcon } from "@chakra-ui/icons";
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
  WrapItem,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { useContext } from "react";
import { BadgeColor, Category } from "../../../../config/constants";
import { RouterPage } from "../../../../config/router";
import textUtils from "../../../../utils/text";
import CardModal from "../../../workspace/CardModal";
import { LoggedUserContext } from "../../LoggedUserProvider";

const StaticCardBacklog = ({ card, participants }) => {
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

  const color = useColorModeValue("#031d46", "#fffdfe");

  const { isOpen, onOpen, onClose } = useDisclosure();
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
        onOpen();
      }}
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
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bgColor={useColorModeValue("gray.200", "#fffdfe")}
              _hover={{ opacity: 0.8 }}
              onClick={(e) => {
                e.stopPropagation();
                console.log("DitMe");
              }}
              aria-label="Search database"
              icon={<AddIcon color="black" />}
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
        color={color}
      />
    </Box>
  );
};

const StaticCard = ({ card }) => {
  const user = useContext(LoggedUserContext);
  const userInfo = textUtils.getFirstLetters(
    user.firstName + " " + user.lastName
  );

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
