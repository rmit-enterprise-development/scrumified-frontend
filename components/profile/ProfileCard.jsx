import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";

const ProfileCard = ({ id, fname, lname, email, bio }) => {
  return (
    <Flex>
      <Avvvatars shadow={true} size="150" value={fname + " " + lname + " (" + email + ")" } />

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
            <Text color={useColorModeValue("#031d46", "#fffdfe")}>{bio}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
