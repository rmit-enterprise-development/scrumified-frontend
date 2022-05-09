import {
  Button,
  CircularProgress,
  Flex,
  FormControl,
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
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import projectAPI from "../../../../../api/services/projectAPI";
import userAPI from "../../../../../api/services/userAPI";
import { digFind } from "../../../../../utils/object";
import { LoggedUserContext } from "../../../../common/LoggedUserProvider";

const EditOption = ({ id, name, participants, fetchUpdate }) => {
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
    participants.map((a) => {
      const userInfo = a.firstName + " " + a.lastName + " (" + a.email + ")";
      return { value: a.id, label: userInfo };
    })
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
    return (
      <Flex flexDir="row" alignItems="center">
        <Avvvatars value={selected.label} />

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
    } else if (selectedItems.length === 0) {
      setIsValid(false);
      setError("Participant list can't be empty");
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
            fetchUpdate();
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
      if (searchTerm !== "" && searchTerm.length >= 3) {
        // Send Axios request here
        try {
          const response = await userAPI.getAll({ key: searchTerm });
          const data = response.data;
          const userList = digFind(data, "userDtoList");

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
            <FormControl isRequired>
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
            </FormControl>

            <FormControl mt={4} isRequired>
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
            </FormControl>
            {!isExisted && (
              <Text as="span" color="red.500" fontWeight="bold">
                {error}
              </Text>
            )}
            {!isValid && (
              <Text as="span" color="red.500" fontWeight="bold">
                {error}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            {isSubmitting && (
              <CircularProgress isIndeterminate color="green.300" />
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