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
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import projectAPI from "../../../../../api/services/projectAPI";

const DeleteOption = ({ id, fetchUpdatedProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleDeleteProject = async () => {
    try {
      const response = await projectAPI.deleteProject(id);
      if (response) {
        onClose();
        fetchUpdatedProject();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        rightIcon={<AiOutlineDelete />}
        justifyContent="space-between"
        colorScheme="red"
        fontWeight="normal"
        onClick={(e) => {
          e.stopPropagation();
          onOpen();
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
            <AlertDialogHeader
              fontSize="lg"
              fontWeight="bold"
              color={useColorModeValue("#031d46", "#fffdfe")}
            >
              Delete Project
            </AlertDialogHeader>

            <AlertDialogBody color={useColorModeValue("#031d46", "#fffdfe")}>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={onClose}
                color={useColorModeValue("#031d46", "#fffdfe")}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteProject}
                ml={3}
                color={useColorModeValue("#031d46", "#fffdfe")}
              >
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
