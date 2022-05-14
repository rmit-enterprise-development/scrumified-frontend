import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";

const CreateSprintDrawer = ({ onClose, isOpen }) => {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"md"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton size="lg" mt="0.75rem" />
        <DrawerHeader mt="0.25rem" fontSize="1.75rem" fontWeight="bold">
          Create new sprint
        </DrawerHeader>
        <DrawerBody>
          <Text> Hello</Text>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
export default CreateSprintDrawer;
