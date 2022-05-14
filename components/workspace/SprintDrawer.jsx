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
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
// import required css from library
import "react-datepicker/dist/react-datepicker.css";

const SprintDrawer = ({ projectId, onClose, isOpen }) => {
  const isValidInput = (value) => value.length > 0;

  const [isValidGoal, setIsValidGoal] = useState(true);
  const [isValidDoneDefinition, setIsValidDoneDefinition] = useState(true);

  const TWO_WEEKS_TIME = 12096e5;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(Date.now() + TWO_WEEKS_TIME));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const initSprint = {
    goal: "",
    status: "todo",
    defOfDone: "",
    startDate: startDate,
    endDate: endDate,
    projectId: projectId,
  };
  const [sprint, setSprint] = useState(initSprint);
  const handleSubmit = () => {
    console.log("Hello");
    if (isValidGoal && isValidDoneDefinition) {
    }
  };

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <Flex h="100%" onClick={onClick} ref={ref} alignItems="center">
      <Text color={useColorModeValue("#031d46", "#fffdfe")}>{value}</Text>
    </Flex>
  ));

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
          Create new sprint
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
              minDate={new Date()}
              onChange={(date) => {
                setStartDate(date);
                setSprint({ ...sprint, startDate: date });
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
                setSprint({ ...sprint, endDate: date });
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
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Create
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default SprintDrawer;
