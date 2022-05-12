import { AddIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
  useColorModeValue,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import projectAPI from "../../api/services/projectAPI";
import userAPI from "../../api/services/userAPI";
import { digFind } from "../../utils/object";
import { LoggedUserContext } from "../common/LoggedUserProvider";
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
  setFilteredCard,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalPoints = Object.values(cards).reduce((accumulator, object) => {
    return accumulator + object.point;
  }, 0);

  // Filter
  const defaultFilter = {
    key: "",
    category: "",
    sortProp: "",
    ascending: false,
    projectId: projectId,
    isBacklog: true,
  };
  const [filterStory, setFilterStory] = useState(defaultFilter);

  const [isFilter, setIsFilter] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // Populate Story data
  const fetchStory = async (filter) => {
    console.log("filter: ", filter);
    try {
      const response = await projectAPI.getAllStories(projectId, filter);
      const data = response.data;
      console.log("data: ", data);
      setFilteredCard(data);
    } catch (error) {
      console.log("Fail to fetch: ", error);
    }
  };

  // Input search story
  const [searchStoryValue, setSearchStoryValue] = useState("");
  const handleStoryChange = (event) => {
    let currentFilter = filterStory;
    if (event.target.value === "") {
      // Reset default
      currentFilter.key = "";
    } else {
      currentFilter.key = event.target.value;
    }
    setSearchStoryValue(event.target.value);
    setIsFilter(true);
    setFilterStory(currentFilter);
  };

  const handleSortStory = (type) => {
    setSortValue(type);
    let currentFilter = filterStory;
    // Reset default
    currentFilter.key = "";

    if (type.includes("Dsc")) {
      currentFilter.ascending = false;
    } else {
      currentFilter.ascending = true;
    }

    if (type.includes("time")) {
      currentFilter.sortProp = "created_date";
    } else {
      currentFilter.sortProp = "points";
    }

    setFilterStory(currentFilter);
    setIsFilter(true);
    fetchStory(filterStory);
  };

  const handleCategoryStory = (category) => {
    setCategoryValue(category);
    let currentFilter = filterStory;
    // Reset default
    currentFilter.key = "";
    currentFilter.category = category;
    setFilterStory(currentFilter);
    setIsFilter(true);
    fetchStory(filterStory);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (isFilter) {
        fetchStory(filterStory);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStoryValue]);

  useEffect(() => {
    setFilteredCard([]);
  }, [isFilter]);

  return (
    <>
      <Flex
        mt={useBreakpointValue({ base: "1rem", md: 0 })}
        flexDir={useBreakpointValue({ base: "column", md: "row" })}
        justifyContent="center"
        flexWrap="wrap"
        pb={5}
        gap={useBreakpointValue({ base: "2rem", md: 0 })}
      >
        <Flex
          gap={useBreakpointValue({ base: "1.5rem", md: "1rem" })}
          flex={1}
          flexWrap="wrap"
          justifyContent={useBreakpointValue({
            base: "center",
            md: "flex-start",
          })}
        >
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
              onChange={(e) => handleCategoryStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={categoryValue}
            >
              <option value="">Category</option>
              <option value="Design(UI/UX)">Design(UI/UX)</option>
              <option value="Front-end">Front-end</option>
              <option value="Back-end">Back-end</option>
              <option value="Testing">Testing</option>
              <option value="DevOps">DevOps</option>
            </Select>

            <Select
              width="auto"
              onChange={(e) => handleSortStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={sortValue}
            >
              <option value="">Sort by:</option>
              <option value="pointDsc">Point: High to Low</option>
              <option value="pointAsc">Point: Low to High</option>
              <option value="timeDsc">Recently Assigned</option>
              <option value="timeAsc">Oldest Assigned</option>
            </Select>

            {isFilter && (
              <IconButton
                colorScheme="red"
                aria-label="Clear Filter"
                icon={<DeleteIcon />}
                onClick={() => {
                  setFilterStory(defaultFilter);
                  setSortValue("");
                  setCategoryValue("");
                  setIsFilter(false);
                }}
              />
            )}
          </Flex>
        </Flex>

        <HStack
          gap="2"
          justifyContent={useBreakpointValue({
            base: "center",
            md: "flex-start",
          })}
        >
          <Text color={useColorModeValue("#031d46", "#fffdfe")}>
            Total points: {totalPoints}
          </Text>
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
