import { Divider, Text } from "@chakra-ui/react";

const SectionHeader = ({ children }) => {
  return (
    <>
      <Text as="h3" fontWeight="bold">
        {children}
      </Text>

      <Divider mb={5} />
    </>
  );
};

export default SectionHeader;
