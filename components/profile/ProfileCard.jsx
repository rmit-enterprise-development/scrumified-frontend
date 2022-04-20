import { Flex, Text } from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";

const ProfileCard = ({ id, fname, lname, email, bio }) => {
  return (
    <Flex>
      <Avvvatars shadow={true} size="150" value={fname + " " + lname} />

      <Flex flexDir="row" ml={10} justifyContent="space-between">
        <Flex flexDir="column">
          <Text fontWeight="medium" fontSize="lg">
            {fname + " " + lname}
          </Text>
          <Text>{email}</Text>

          <Flex mt={10} flexDir="column">
            <Text>{bio}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ProfileCard;
