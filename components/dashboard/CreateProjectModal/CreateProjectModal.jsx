import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
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
  useToast,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import userAPI from "../../../api/services/userAPI";
import { digFind } from "../../../utils/object";
import textUtils from "../../../utils/text";
import { RouterPage } from "../../../config/router";
import { LoggedUserContext } from "../../common/LoggedUserProvider";

const CreateProjectModal = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [searchTermParticipant, setSearchTermParticipant] = useState("");
  const [isExisted, setIsExisted] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorName, setErrorName] = useState("");

  const initialRef = useRef();
  const finalRef = useRef();

  const [pickerItems, setPickerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const user = useContext(LoggedUserContext);

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const [searchName, setSearchName] = useState("");
  const handleSearchNameChange = (event) => setSearchName(event.target.value);

  const customInputRender = (inputProps) => (
    <Input
      {...inputProps}
      value={searchTermParticipant}
      onChange={(e) => {
        setSearchTermParticipant(e.target.value);
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
    if (isValid && isExisted) {
      try {
        const request = {
          title: searchName,
          participantsId: selectedItems.map((a) => a.value),
        };
        setIsSubmitting(true);
        const response = await userAPI.postProject(user.logUserId, request);

        // Push to project backlog with new ID
        const projectID = response.data.id;
        toast({
          title: "Create project successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        Router.push({
          pathname: `${RouterPage.PROJECT}/${projectID}${RouterPage.BACKLOG}`,
        });
        setIsSubmitting(false);
        onClose();
      } catch (error) {
        console.error("There was an error: ", error);
      }
    }
  };
  // For checking project name is existed for that user
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchName === "") {
        setIsValid(false);
        setErrorName("Project name can't be empty");
      } else {
        // Send Axios request here
        try {
          const response = await userAPI.getAllProjects(user.logUserId, {
            key: searchName,
          });
          const data = response.data;
          if (data && data.totalElements !== 0) {
            setIsValid(false);
            setErrorName("You've already joined a project with a same name");
          } else {
            setIsValid(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  // For finding participant info across the system
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTermParticipant !== "" && searchTermParticipant.length >= 2) {
        // Send Axios request here
        try {
          const response = await userAPI.getAll({ key: searchTermParticipant });
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
  }, [searchTermParticipant]);

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        colorScheme="teal"
        onClick={onOpen}
        color={useColorModeValue("#FFFDFE", "#2d4046")}
      >
        Create Project
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
            Create your project
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired isInvalid={!isValid}>
              <FormLabel color={useColorModeValue("#031e49", "#fffdfe")}>
                Project name
              </FormLabel>
              <Input
                ref={initialRef}
                color={useColorModeValue("#031d46", "#fffdfe")}
                value={searchName}
                onChange={handleSearchNameChange}
              />
              {isValid ? (
                <FormHelperText sx={{ color: "green.500" }}>
                  Your project name is unique and valid!
                </FormHelperText>
              ) : (
                <FormErrorMessage>{errorName}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4} isInvalid={!isExisted}>
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
                selectedItems.length === 0 && (
                  <FormHelperText>
                    You can leave this empty for now and edit later in Dashboard.
                  </FormHelperText>
                )
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            {isSubmitting && (
              <CircularProgress isIndeterminate color="green.300" mr={3} />
            )}
            <Button onClick={onClose} disabled={isSubmitting} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
