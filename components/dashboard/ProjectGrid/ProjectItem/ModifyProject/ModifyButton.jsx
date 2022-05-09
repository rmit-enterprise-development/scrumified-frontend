import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AiOutlineEdit } from "react-icons/ai";

import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteOption from "./DeleteOption";

export default function ServerSecondaryOptions() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <Menu>
        <MenuButton
          as={IconButton}
          icon={
            <BsThreeDotsVertical
              color={useColorModeValue("#031d46", "#fffdfe")}
            />
          }
          onClick={(e) => e.stopPropagation()}
        ></MenuButton>
        <MenuList>
          <Stack>
            <Button
              variant="ghost"
              rightIcon={<AiOutlineEdit />}
              justifyContent="space-between"
              fontWeight="normal"
              fontSize="sm"
            >
              Edit Project
            </Button>
            <DeleteOption />
          </Stack>
        </MenuList>
      </Menu>
    </Flex>
  );
}
