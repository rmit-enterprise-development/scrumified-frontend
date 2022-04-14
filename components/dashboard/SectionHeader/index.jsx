import { Button, Divider, Flex, Text } from "@chakra-ui/react";
import { HiOutlinePlusSm } from "react-icons/hi";

const SectionHeader = ({ children }) => {
  return (
    <>
      <Text as="h3" fontWeight="bold">
        {children}
      </Text>
    </>
  );
};

export default SectionHeader;
