import { InfoIcon } from "@chakra-ui/icons";
import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import projectAPI from "../../../../../api/services/projectAPI";
import userAPI from "../../../../../api/services/userAPI";
import { digFind } from "../../../../../utils/object";
import textUtils from "../../../../../utils/text";
import { LoggedUserContext } from "../../../../common/LoggedUserProvider";

const EditOption = ({ id, name, participants, fetchUpdatedProject }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const [isExisted, setIsExisted] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const initialRef = useRef();
  const finalRef = useRef();

  const [pickerItems, setPickerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(
    participants
      ? participants.map((a) => {
          const userInfo =
            a.firstName + " " + a.lastName + " (" + a.email + ")";
          return { value: a.id, label: userInfo };
        })
      : []
  );

  const user = useContext(LoggedUserContext);

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const [text, setText] = useState(name);
  const handleTextChange = (event) => setText(event.target.value);

  const customInputRender = (inputProps) => (
    <Input
      {...inputProps}
      value={searchTerm}
      onChange={(e) => {
        setSearchTerm(e.target.value);
      }}
    />
  );

  const customRender = (selected) => {
    const nameOnly = selected.label.split("(")[0];

    return (
      <Flex flexDir="row" alignItems="center">
        <Avvvatars
          value={textUtils.getFirstLetters(nameOnly) + " " + selected.value}
        />

        {colorMode === "dark" ? (
          <Text pl={5} color="#fffdfe">
            {selected.label}
          </Text>
        ) : (
          <Text pl={5} color="#031d46">
            {selected.label}
          </Text>
        )}
      </Flex>
    );
  };

  const handleSubmit = async () => {
    if (text === "") {
      setIsValid(false);
      setError("Project name can't be empty");
    } else {
      setIsValid(true);
      const request = {
        title: text,
        participantsId: selectedItems.map((a) => a.value),
      };

      if (user) {
        try {
          setIsSubmitting(true);
          const response = await projectAPI.putProject(id, request);

          if (response) {
            fetchUpdatedProject();
          }
        } catch (error) {
          console.error("There was an error: ", error);
        } finally {
          setIsSubmitting(false);
          onClose();
        }
      }
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm !== "") {
        // Send Axios request here
        try {
          const response = await userAPI.getAll({ key: searchTerm });
          const data = response.data;
          const userList = digFind(data, "userDtoes");

          if (userList) {
            const participantList = userList.map((a) => {
              const userInfo =
                a.firstName + " " + a.lastName + " (" + a.email + ")";
              return { value: a.id, label: userInfo };
            });
            setIsExisted(true);
            setPickerItems(
              participantList.sort((a, b) => a.label.localeCompare(b.label))
            );
          } else {
            setIsExisted(false);
            setError("User not found!");
            setPickerItems([]);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        setIsExisted(true);
        setPickerItems([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Button
        variant="ghost"
        rightIcon={<AiOutlineEdit />}
        justifyContent="space-between"
        fontWeight="normal"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
        }}
      >
        Edit Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader color={useColorModeValue("#031e49", "#fffdfe")}>
            Edit your project
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!isValid}>
              <FormLabel color={useColorModeValue("#031e49", "#fffdfe")}>
                Project name
              </FormLabel>
              <Input
                ref={initialRef}
                placeholder="Project name"
                color={useColorModeValue("#031d46", "#fffdfe")}
                value={text}
                onChange={handleTextChange}
              />
              {isValid ? (
                <FormHelperText sx={{ color: "green.500" }}>
                  Your project name is unique and valid!
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errorName}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isRequired isInvalid={!isExisted}>
              <CUIAutoComplete
                tagStyleProps={{
                  rounded: "full",
                }}
                label="Participants"
                placeholder="Enter a participant's info (>3 characters)"
                items={pickerItems}
                itemRenderer={customRender}
                selectedItems={selectedItems}
                onSelectedItemsChange={(changes) =>
                  handleSelectedItemsChange(changes.selectedItems)
                }
                hideToggleButton={true}
                listStyleProps={{
                  maxHeight: "200",
                  overflow: "auto",
                  bg: useColorModeValue("", "#2D3748"),
                }}
                listItemStyleProps={{
                  cursor: "pointer",
                  _hover: {
                    bg: useColorModeValue("", "#031e49"),
                  },
                }}
                labelStyleProps={{
                  color: useColorModeValue("#031e49", "#fffdfe"),
                }}
                inputStyleProps={{
                  color: useColorModeValue("#031d46", "#fffdfe"),
                }}
                renderCustomInput={customInputRender}
                disableCreateItem
              />
              {!isExisted ? (
                <FormErrorMessage>User not found!</FormErrorMessage>
              ) : (
                <FormHelperText color="orange.500">
                  <Icon as={InfoIcon} mr={2} />
                  Warning: If you remove a user from this project, the current
                  task of him/her will be automatically assigned to the owner
                  (yourself)!
                </FormHelperText>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {isSubmitting && (
              <CircularProgress isIndeterminate color="green.300" mr={3} />
            )}
            <Button
              onClick={onClose}
              disabled={isSubmitting}
              mr={3}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={isSubmitting}
              color={useColorModeValue("#031e49", "#fffdfe")}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditOption;
