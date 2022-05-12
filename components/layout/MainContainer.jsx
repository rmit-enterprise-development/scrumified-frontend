import {
  Box,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import SideBar from "../common/SideBar/SideBar";

export default function MainContainer({ children }) {
  return (
    <Flex
      maxH="100vh"
      overflow="scroll"
      flexDir={useBreakpointValue({ base: "column", md: "row" })}
    >
      <SideBar />
      <Box
        flexGrow={1}
        overflow="auto"
        bg={useColorModeValue("#FFFDFE", "#031E49")}
      >
        <Box
          py={useBreakpointValue({ base: 0, md: 5 })}
          px={useBreakpointValue({ base: 30, md: 10 })}
        >
          {children}
        </Box>
      </Box>
    </Flex>
  );
}
