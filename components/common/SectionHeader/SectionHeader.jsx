import { Text, useColorModeValue } from "@chakra-ui/react";

const SectionHeader = ({ children }) => {
  return (
    <>
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={useColorModeValue("#031d46", "#fffdfe")}
        py={3}
      >
        {children}
      </Text>
    </>
  );
};

export default SectionHeader;
