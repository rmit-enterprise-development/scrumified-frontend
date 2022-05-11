import { useState } from "react";
import {
  Flex,
  Spacer,
  Text,
  FormControl,
  Select,
  HStack,
  useDisclosure,
  IconButton,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

import { AddIcon, Search2Icon } from "@chakra-ui/icons";
import CardModal from "./CardModal";

const BacklogController = ({
  cards,
  setCards,
  bg,
  color,
  btnColor,
  btnBg,
  projectId,
  participants,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Filter
  const [filterStory, setFilterStory] = useState({
    key: "",
    category: "",
    sortProp: "points",
    ascending: false,
    projectId: projectId,
  });
  // Input search story
  const [searchStoryValue, setSearchStoryValue] = useState("");
  const handleStoryChange = (event) => {
    if (event.target.value === "") {
      let currentFilter = filterStory;
      // Reset default
      currentFilter.key = "";
      setFilterStory(currentFilter);
      // fetchStory(filterStory);
    }
    setSearchStoryValue(event.target.value);
  };
  // Submit search name project
  const handleSearchStory = () => {
    let currentFilter = filterStory;
    // Reset default
    currentFilter.key = searchStoryValue;
    setFilterStory(currentFilter);
    // fetchStory(filterStory);
  };

  const handleSortStory = (type) => {
    let currentFilter = filterStory;
    // Reset default
    currentFilter.key = "";

    if (type.includes("Dsc")) {
      currentFilter.ascending = true;
    } else {
      currentFilter.ascending = false;
    }

    if (type.includes("time")) {
      currentFilter.sortProp = "created_date";
    } else {
      currentFilter.sortProp = "points";
    }

    setFilterStory(currentFilter);
    // fetchStory(filterStory);
  };

  const handleCategoryStory = (category) => {
    let currentFilter = filterStory;
    // Reset default
    currentFilter.key = "";
    currentFilter.category = category;
    setFilterStory(currentFilter);
    // fetchStory(filterStory);
  };

  return (
    <>
      <Flex justifyContent="space-between" flexWrap="wrap" pb={5}>
        <Flex gap={2} flex={1} flexWrap="wrap">
          <InputGroup maxW={250}>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<Search2Icon color="gray.300" />}
            />
            <Input
              placeholder="Search for story name"
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={searchStoryValue}
              onChange={handleStoryChange}
            />
          </InputGroup>

          <Flex gap={2}>
            <Select
              width="auto"
              onChange={(e) => handleSortStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
              defaultValue="pointDsc"
            >
              <option value="pointDsc">Point: High to Low</option>
              <option value="pointAsc">Point: Low to High</option>
              <option value="timeDsc">Recently Assigned</option>
              <option value="timeAsc">Oldest Assigned</option>
            </Select>

            <Select
              width="auto"
              onChange={(e) => handleCategoryStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
            >
              <option value="">Category</option>
              <option value="design">Design (UI/UX)</option>
              <option value="front-end">Front-end</option>
              <option value="back-end">Back-end</option>
              <option value="testing">Testing</option>
              <option value="devops">DevOps</option>
            </Select>
          </Flex>
        </Flex>
        <HStack gap="2">
          <Text>Total points: 8</Text>
          <IconButton
            _hover={{ opacity: 0.8 }}
            bg={btnBg}
            onClick={() => {
              onOpen();
            }}
            aria-label="Search database"
            icon={<AddIcon />}
          />
        </HStack>
      </Flex>

      <CardModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        cards={cards}
        setCards={setCards}
        color={color}
        bg={bg}
        btnBg={btnBg}
        btnColor={btnColor}
        projectId={projectId}
        participants={participants}
      />
    </>
  );
};

export default BacklogController;
