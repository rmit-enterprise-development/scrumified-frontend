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
  useDisclosure,
  useColorModeValue,
} from "@chakra-ui/react";
import Avvvatars from "avvvatars-react";
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useRef, useState } from "react";

const CreateProjectModal = ({ participantList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  const [pickerItems, setPickerItems] = useState(
    participantList.sort((a, b) => a.label.localeCompare(b.label))
  );

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
        <Text pl={5}>{selected.label}</Text>
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
          <ModalHeader color={useColorModeValue("#031e49", "gray.200")}>
            Create your project
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                Project name
              </FormLabel>
              <Input ref={initialRef} placeholder="Project name" />
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
                listStyleProps={{ maxHeight: "200", overflow: "auto" }}
                listItemStyleProps={{ cursor: "pointer" }}
                labelStyleProps={{
                  color: useColorModeValue("#031e49", "gray.200"),
                }}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateProjectModal;