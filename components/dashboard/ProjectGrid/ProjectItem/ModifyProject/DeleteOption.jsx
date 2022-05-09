import {
  Button,
  AlertDialogFooter,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialog,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";

const DeleteOption = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Button
        variant="ghost"
        rightIcon={<AiOutlineDelete />}
        justifyContent="space-between"
        fontWeight="normal"
        colorScheme="red"
        fontSize="sm"
        onClick={(e) => {
          e.stopPropagation();
          onOpen;
        }}
      >
        Delete Project
      </Button>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onClose} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteOption;
