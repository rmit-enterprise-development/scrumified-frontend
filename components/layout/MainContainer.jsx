import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import SideBar from "../common/SideBar/SideBar";

export default function MainContainer({ user, children }) {
  return (
    <Flex>
      <SideBar user={user} />
      <Box flexGrow="1" bg={useColorModeValue("#FFFDFE", "#031E49")}>
        <Box my={5} mr={10}>
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
