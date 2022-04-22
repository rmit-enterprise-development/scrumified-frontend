import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
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
import Router from "next/router";
import { useEffect, useRef, useState } from "react";

const CreateProjectModal = ({ participantList }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const [pickerItems, setPickerItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItemsChange = (selectedItems) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

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

  const customCreateItemRender = (value) => {
    return (
      <Text as="span" color="red.500" fontWeight="bold">
        User not found!
      </Text>
    );
  };

  const handleSubmit = async () => {
    const userID = "";
    const request = {
      title: "",
      participantsId: selectedItems.map((a) => a.value),
    };
    try {
      const response = await projectAPI.postProject(userID, request);
      if (response && response.header !== 200) {
        // Handle error
      } else {
        // Push to project backlog with new ID
        const projectID = "";
        Router.push({
          pathname: `${RouterPage.PROJECT}/${projectID}${RouterPage.BACKLOG}`,
        });
      }
    } catch (error) {
      console.error("There was an error: ", error);
    }
  };

  useEffect(() => {
    setPickerItems(
      participantList.sort((a, b) => a.label.localeCompare(b.label))
    );
  }, [participantList]);

  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        size="sm"
        colorScheme="teal"
        onClick={onOpen}
      >
        Create Project
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color={useColorModeValue("#031e49", "#fffdfe")}>
            Create your project
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
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <CUIAutoComplete
                tagStyleProps={{
                  rounded: "full",
                }}
                label="Participants"
                placeholder="Enter a participant's email"
                onCreateItem={() => {}} // Empty because don't want to add option in list. Please see the example in "https://www.npmjs.com/package/chakra-ui-autocomplete"
                items={pickerItems}
                itemRenderer={customRender}
                createItemRenderer={customCreateItemRender}
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
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} colorScheme="blue">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;
