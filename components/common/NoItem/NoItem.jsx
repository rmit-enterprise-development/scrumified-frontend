import { Icon, Flex, Text, useColorModeValue } from "@chakra-ui/react";

const NoItem = ({ icon, children }) => {
  return (
    <>
      <Flex
        borderColor={useColorModeValue("#fffdfe", "#2d4046")}
        alignItems="center"
        flexDir="column"
        gap={3}
        h="150px"
      >
        <Icon fontSize="5xl" color="grey" as={icon} />
        <Text as="i" color="grey">
          {children}
        </Text>
      </Flex>
    </>
  );
};

export default NoItem;
