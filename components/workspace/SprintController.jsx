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
  useToast,
  WrapItem,
} from "@chakra-ui/react";
import sprintAPI from "../../api/services/sprintAPI";

const SprintController = ({
  sprintId,
  isSprint,
  isActive,
  points,
  getCurrentSprint,
  setCards,
}) => {
  let color = useColorModeValue("#031d46", "#fffdfe");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  let btnColor = "black";
  let bg = useColorModeValue("gray.100", "#405A7D");
  const toast = useToast();
  const handleStartSprint = async () => {
    try {
      const response = await sprintAPI.putSprint(sprintId, {
        status: "inProgress",
        startDate: Math.floor(new Date().getTime() / 1000),
      });
      if (response) {
        toast({
          title: "Start sprint successfully!",
          description: "You can start dragging the cards!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Start sprint failed!",
        description: "Please contact your administrator.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      getCurrentSprint();
    }
  };
  const handleCompleteSprint = async () => {
    try {
      const response = await sprintAPI.completeSprint(sprintId);
      if (response) {
        toast({
          title: "Complete sprint successfully!",
          description: "You can check the archived sprint in Roadmap",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Complete sprint failed!",
        description: "Please contact your administrator.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } finally {
      getCurrentSprint();
    }
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
            colorScheme={isActive ? "teal" : "telegram"}
            // color={useColorModeValue("#FFFDFE", "#2d4046")}
            onClick={isActive ? handleCompleteSprint : handleStartSprint}
            // style={{
            //   display: isActive ? "none" : "flex",
            // }}
            disabled={!isSprint}
          >
            {isActive ? "Complete Sprint" : "Start Sprint"}
          </Button>
        )}
      </Flex>
    </>
  );
};

export default SprintController;
