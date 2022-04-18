import { EditIcon } from "@chakra-ui/icons";
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
import { useRef, useState } from "react";

const EditProfileModal = ({id, fname, lname, email, bio }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();
  const finalRef = useRef();

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        size="sm"
        colorScheme="teal"
        onClick={onOpen}
      >
        Edit Profile
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
            Edit Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    First Name
                </FormLabel>
              <Input name="fname" placeholder="First Name" value={fname}/>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Last Name
                </FormLabel>
                <Input name="lname" placeholder="Last Name" value={lname}/>
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Email
                </FormLabel>
                <Input name="email" type="email" placeholder="Email" value={email}/>
            </FormControl>

            <FormControl mt={4}>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Biography
                </FormLabel>
                <Input name="bio" placeholder="Biography" value={bio}/>
            </FormControl>

            
            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Password
                </FormLabel>
                <Input name="password" type="password" placeholder="Password" />
            </FormControl>

            <FormControl mt={4} isRequired>
                <FormLabel color={useColorModeValue("#031e49", "gray.200")}>
                    Reconfirm Password
                </FormLabel>
                <Input name="re-password" type="password" placeholder="Password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Edit
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProfileModal;
