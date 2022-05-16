import {
  Button,
  Circle,
  Flex,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";

const SprintController = ({ isSprint, isPending, points }) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  let btnColor = "black";
  let bg = useColorModeValue("gray.100", "#405A7D");

  const handleStartSprint = () => {
    console.log("Start Sprint");
  };
  const handleCompleteSprint = () => {
    console.log("Complete Sprint");
  };

  return (
    <>
      <Flex
        mt={useBreakpointValue({ base: "1rem", md: 0 })}
        flexDir={useBreakpointValue({ base: "column", sm: "row" })}
        justifyContent={"space-between"}
        pb={5}
        gap={useBreakpointValue({ base: "2rem", md: 0 })}
        alignItems={"center"}
      >
        <Flex
          gap={"1rem"}
          bg={bg}
          borderRadius={"1rem"}
          alignItems={"center"}
          paddingX={3}
          paddingY={2}
        >
          <Text color={color}>Points:</Text>
          <WrapItem>
            <Tooltip label={"Todo points"} placement={"bottom"}>
              <Circle size={6} color={"white"} bgColor={"red.500"}>
                {points.todo}
              </Circle>
            </Tooltip>
          </WrapItem>
          <WrapItem>
            <Tooltip label={"In Progress points"} placement={"bottom"}>
              <Circle size={6} color={"white"} bgColor={"blue.500"}>
                {points.inProgress}
              </Circle>
            </Tooltip>
          </WrapItem>
          <WrapItem>
            <Tooltip label={"Done points"} placement={"bottom"}>
              <Circle size={6} color={"white"} bgColor={"green.500"}>
                {points.done}
              </Circle>
            </Tooltip>
          </WrapItem>
        </Flex>
        {isSprint && (
          <Button
            colorScheme={isPending ? "telegram" : "teal"}
            // color={useColorModeValue("#FFFDFE", "#2d4046")}
            onClick={isPending ? handleStartSprint : handleCompleteSprint}
            // style={{
            //   display: isPending ? "none" : "flex",
            // }}
            disabled={!isSprint}
          >
            {isPending ? "Start Sprint" : "Complete Sprint"}
          </Button>
        )}
      </Flex>
    </>
  );
};

export default SprintController;
