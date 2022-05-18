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
  useToast,
  CircularProgress,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import projectAPI from "../../../../../api/services/projectAPI";

const DeleteOption = ({ id, fetchUpdatedProject }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDeleteProject = async () => {
    try {
      setIsSubmitting(true);
      const response = await projectAPI.deleteProject(id);
      if (response) {
        toast({
          title: "Delete project successfully!",
          status: "success",
          duration: 2000,
          isClosable: true,
        });
        fetchUpdatedProject();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
      onClose();
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
              {isSubmitting && (
                <CircularProgress isIndeterminate color="green.300" mr={3} />
              )}
              <Button
                ref={cancelRef}
                onClick={onClose}
                color={useColorModeValue("#031d46", "#fffdfe")}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDeleteProject}
                ml={3}
                color={useColorModeValue("#031d46", "#fffdfe")}
                disabled={isSubmitting}
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
