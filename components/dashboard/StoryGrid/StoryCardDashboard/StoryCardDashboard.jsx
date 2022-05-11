import {
  Badge,
  Box,
  Circle,
  Flex,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import Router from "next/router";
import { useContext } from "react";
import { RouterPage } from "../../../../config/router";
import { LoggedUserContext } from "../../../common/LoggedUserProvider";

const StoryCardDashboard = ({ card }) => {
  const colorScheme = "red" + ".500";
  const user = useContext(LoggedUserContext);
  const userInfo =
    user.firstName + " " + user.lastName + " (" + user.email + ")";
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
        Router.push({
          pathname: `${RouterPage.PROJECT}/${card.projectId}${RouterPage.BACKLOG}`,
        });
      }}
    >
      <Flex alignItems={"center"} justifyContent={"space-between"}>
        <Heading fontSize="xl" isTruncated>
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
    </Box>
  );
};

export default StoryCardDashboard;
