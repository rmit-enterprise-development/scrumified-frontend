import {
  Button,
  CircularProgress,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  Input,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
// import required css from library
import "react-datepicker/dist/react-datepicker.css";
import projectAPI from "../../api/services/projectAPI";
import sprintAPI from "../../api/services/sprintAPI";

const SprintDrawer = ({
  projectId,
  onClose,
  isOpen,
  currentSprint,
  fetchUpdatedSprint,
  isSprint,
}) => {
  const toast = useToast();
  const isValidInput = (value) => value.length > 0;

  const [isValidGoal, setIsValidGoal] = useState(isSprint);
  const [isValidDoneDefinition, setIsValidDoneDefinition] = useState(isSprint);

  const TWO_WEEKS_TIME = 12096e5;
  const [startDate, setStartDate] = useState(
    isSprint ? currentSprint.startDate : new Date()
  );
  const [endDate, setEndDate] = useState(
    isSprint ? currentSprint.endDate : new Date(Date.now() + TWO_WEEKS_TIME)
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const initSprint = {
    goal: "",
    status: "todo",
    defOfDone: "",
    startDate: Math.floor(new Date().getTime() / 1000),
    endDate: Math.floor(new Date(Date.now() + TWO_WEEKS_TIME).getTime() / 1000),
    projectId: projectId,
  };

  const [sprint, setSprint] = useState(isSprint ? currentSprint : initSprint);

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Flex h="100%" onClick={onClick} ref={ref} alignItems="center">
      <Text color={useColorModeValue("#031d46", "#fffdfe")}>{value}</Text>
    </Flex>
  ));

  const createSprint = async (sprint) => {
    try {
      const response = projectAPI.postSprint(projectId, sprint);
      if (response) {
        setIsSubmitting(false);
        toast({
          title: "Create sprint successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchUpdatedSprint();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateSprint = (sprint) => {
    try {
      const response = sprintAPI.putSprint(sprint.id, sprint);
      if (response) {
        setIsSubmitting(false);
        toast({
          title: "Update sprint successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchUpdatedSprint();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSprint = (id) => {
    try {
      const response = sprintAPI.deleteSprint(id);
      if (response) {
        setIsSubmitting(false);
        toast({
          title: "Delete sprint successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchUpdatedSprint();
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setSprint(isSprint ? currentSprint : initSprint);
    setIsValidGoal(isSprint);
    setIsValidDoneDefinition(isSprint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSprint]);

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton
          size="lg"
          mt="0.75rem"
          color={useColorModeValue("#031d46", "#fffdfe")}
        />
        <DrawerHeader
          mt="0.25rem"
          fontSize="1.75rem"
          fontWeight="bold"
          color={useColorModeValue("#031d46", "#fffdfe")}
        >
          {isSprint ? "Update sprint" : "Create new sprint"}
        </DrawerHeader>
        <DrawerBody>
          <FormControl isRequired isInvalid={!isValidGoal}>
            <FormLabel
              htmlFor="goal"
              fontSize={"lg"}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Sprint goal:
            </FormLabel>
            <Input
              defaultValue={sprint.goal}
              color={useColorModeValue("#031d46", "#fffdfe")}
              onChange={(e) => {
                setSprint({ ...sprint, goal: e.target.value });
                setIsValidGoal(isValidInput(e.target.value));
              }}
            />
            {!isValidGoal && (
              <FormErrorMessage>Must not be blank</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isRequired isInvalid={!isValidDoneDefinition}>
            <FormLabel
              htmlFor="doneDefinition"
              fontSize={"lg"}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Definition of Done:
            </FormLabel>
            <Textarea
              defaultValue={sprint.defOfDone}
              placeholder="Requirement(s) to complete a sprint"
              resize="none"
              color={useColorModeValue("#031d46", "#fffdfe")}
              onChange={(e) => {
                setSprint({ ...sprint, defOfDone: e.target.value });
                setIsValidDoneDefinition(isValidInput(e.target.value));
              }}
            />
            {!isValidDoneDefinition && (
              <FormErrorMessage>Must not be blank</FormErrorMessage>
            )}
          </FormControl>

          <FormControl mt={4} isRequired>
            <FormLabel
              htmlFor="startDate"
              fontSize={"lg"}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Sprint starts at:
            </FormLabel>
            <DatePicker
              id="start-date"
              dateFormat="dd/MM/yyyy"
              selected={startDate}
              minDate={new Date(Date.now())}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(new Date(date.getTime() + TWO_WEEKS_TIME));
                setSprint({
                  ...sprint,
                  startDate: Math.floor(date.getTime() / 1000),
                });
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              closeOnScroll={true}
              customInput={<CustomInput />}
              onChangeRaw={(e) => e.preventDefault()}
            />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel
              htmlFor="startDate"
              fontSize={"lg"}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Sprint ends at:
            </FormLabel>
            <DatePicker
              id="end-date"
              dateFormat="dd/MM/yyyy"
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                setSprint({
                  ...sprint,
                  endDate: Math.floor(date.getTime() / 1000),
                });
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              closeOnScroll={true}
              customInput={<CustomInput />}
              onChangeRaw={(e) => e.preventDefault()}
            />
            <FormHelperText>Default sprint duration: 2 weeks</FormHelperText>
          </FormControl>
        </DrawerBody>

        <DrawerFooter>
          {isSubmitting && (
            <CircularProgress isIndeterminate color="green.300" />
          )}
          {isSprint && (
            <Button
              colorScheme={"red"}
              variant={"outline"}
              onClick={() => {
                deleteSprint(sprint.id);
              }}
              mr={4}
            >
              Delete
            </Button>
          )}

          <Button
            colorScheme={"gray"}
            variant={"outline"}
            onClick={onClose}
            mr={4}
            disabled={isSubmitting}
          >
            Close
          </Button>
          <Button
            colorScheme="blue"
            isDisabled={!(isValidDoneDefinition && isValidGoal)}
            onClick={() => {
              setIsSubmitting(true);
              if (isValidDoneDefinition && isValidGoal) {
                const result = isSprint
                  ? {
                      ...sprint,
                      id: sprint.id,
                    }
                  : sprint;
                isSprint ? updateSprint(result) : createSprint(result);
                if (!isSprint) {
                  setSprint(initSprint);
                  setIsValidDoneDefinition(false);
                  setIsValidGoal(false);
                }
              }
            }}
            disabled={isSubmitting}
          >
            {isSprint ? "Update" : "Create"}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default SprintDrawer;
