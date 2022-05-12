import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import textUtils from "../../utils/text";

const ProfileCard = ({ fname, lname, email, description }) => {
  if (!description) {
    description = "My description";
  }

  return (
    <Flex>
      <Avvvatars
        shadow={true}
        size="150"
        value={textUtils.getFirstLetters(fname + " " + lname)}
      />

      <Flex flexDir="row" ml={10} justifyContent="space-between">
        <Flex flexDir="column">
          <Text
            fontWeight="medium"
            fontSize="lg"
            color={useColorModeValue("#031d46", "#fffdfe")}
          >
            {fname + " " + lname}
          </Text>
          <Text color={useColorModeValue("#031d46", "#fffdfe")}>{email}</Text>

          <Flex mt={10} flexDir="column">
            <Text color={useColorModeValue("#031d46", "#fffdfe")}>
              {description}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
