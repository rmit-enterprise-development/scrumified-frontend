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
import { RouterPage } from "../../../../config/router";
import CardModal from "../../../workspace/CardModal";
import { LoggedUserContext } from "../../LoggedUserProvider";

const StaticCard = ({ card, isBacklog, participants }) => {
  const colorScheme = "red" + ".500";
  const user = useContext(LoggedUserContext);
  const userInfo =
    user.firstName + " " + user.lastName + " (" + user.email + ")";
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      _hover={{
        boxShadow:
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
      }}
      transition="all 0.2s linear"
      cursor="pointer"
      boxSizing="border-box"
      borderRadius="1rem"
      overflow="hidden"
      bg={useColorModeValue("#fffdfe", "#405A7D")}
      color={useColorModeValue("#031d46", "#fffdfe")}
      mb={4}
      p={4}
      boxShadow="base"
      onClick={() => {
        isBacklog
          ? onOpen()
          : Router.push({
              pathname: `${RouterPage.PROJECT}/${card.projectId}${RouterPage.BACKLOG}`,
            });
      }}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="xl" isTruncated>
          {card.userStory}
        </Heading>

        {isBacklog && (
          <WrapItem>
            <Tooltip label={"Add to sprint 1"} placement={"left-start"}>
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
        )}
      </Flex>
      <Flex
        mt={4}
        justifyContent="space-between"
        alignItems={"center"}
        alignContent={"center"}
      >
        <Flex alignItems={"center"}>
          <Text paddingRight={2}>Assignees:</Text>
          <Avvvatars value={userInfo} size="25" />
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

      {isBacklog && (
        <CardModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          prevCard={card}
          participants={participants}
          isCard={true}
        />
      )}
    </Box>
  );
};

export default StaticCard;
