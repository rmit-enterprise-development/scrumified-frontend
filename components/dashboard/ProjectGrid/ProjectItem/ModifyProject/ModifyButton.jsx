import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteOption from "./DeleteOption";
import EditOption from "./EditOption";

export default function ModifyButton({
  id,
  name,
  participants,
  fetchUpdatedProject,
}) {
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
            <EditOption
              id={id}
              name={name}
              participants={participants}
              fetchUpdatedProject={fetchUpdatedProject}
            />

            <DeleteOption id={id} fetchUpdatedProject={fetchUpdatedProject} />
          </Stack>
        </MenuList>
      </Menu>
    </Flex>
  );
}
