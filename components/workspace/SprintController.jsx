import {
  Button,
  Flex,
  Skeleton,
  Tag,
  Text,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";

const SprintController = ({ isPending, isLoading }) => {
  console.log("isLoading: ", isLoading);
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
              <Tag
                borderRadius={"full"}
                size={"6"}
                p={"6px"}
                bgColor={"red.500"}
                color={"white"}
              >
                10
              </Tag>
            </Tooltip>
          </WrapItem>
          <WrapItem>
            <Tooltip label={"In Progress points"} placement={"bottom"}>
              <Tag
                borderRadius={"full"}
                size={"6"}
                p={"6px"}
                bgColor={"blue.500"}
                color={"white"}
              >
                10
              </Tag>
            </Tooltip>
          </WrapItem>
          <WrapItem>
            <Tooltip label={"Done points"} placement={"bottom"}>
              <Tag
                borderRadius={"full"}
                size={"6"}
                p={"6px"}
                color={"white"}
                bgColor={"green.500"}
              >
                10
              </Tag>
            </Tooltip>
          </WrapItem>
        </Flex>
        <Skeleton isLoaded={!isLoading}>
          <Button
            colorScheme={isPending ? "telegram" : "teal"}
            // color={useColorModeValue("#FFFDFE", "#2d4046")}
            onClick={isPending ? handleStartSprint : handleCompleteSprint}
          >
            {isPending ? "Start Sprint" : "Complete Sprint"}
          </Button>
        </Skeleton>
      </Flex>
    </>
  );
};

export default SprintController;
