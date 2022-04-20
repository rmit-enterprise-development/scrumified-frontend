import {
  Box,
  Button,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  Select,
  Spacer,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import React from "react";

import CardModal from "./CardModal";

const SearchBar = ({ cardList, setCardList }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <FormControl>
      <Flex>
        <HStack py="2">
          <InputGroup>
            <Input placeholder="Basic usage" />
          </InputGroup>
          <Select placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
          <Box>
            <Button>Button</Button>
          </Box>
        </HStack>
        <Spacer />
        <HStack gap="2">
          <Text>Total points: 8</Text>
          <Button
            onClick={() => {
              onOpen();
            }}
          >
            Create User Card
          </Button>
        </HStack>
      </Flex>
      <CardModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cardList={cardList}
        setCardList={setCardList}
      />
    </FormControl>
  );
};

export default SearchBar;
