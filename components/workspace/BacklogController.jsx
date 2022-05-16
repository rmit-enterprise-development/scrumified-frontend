import { AddIcon, DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Circle,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  SkeletonCircle,
  Tag,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import projectAPI from "../../api/services/projectAPI";
import { digFind } from "../../utils/object";
import CardModal from "./CardModal";

const BacklogController = ({
  cards,
  setCards,
  projectId,
  participants,
  setFilteredCard,
  isLoading,
}) => {
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalPoints = Object.values(cards).reduce((accumulator, object) => {
    return accumulator + object.point;
  }, 0);
  const PAGE_SIZE_BACKLOG = 1000; // Backlog story need to be all shown

  // Filter
  const defaultFilter = {
    key: "",
    category: "",
    sortProp: "",
    ascending: false,
    projectId: projectId,
    limit: PAGE_SIZE_BACKLOG,
    isBacklog: true,
    returnArray: true, // Avoid auto sort by object key from browser
  };
  const [filterStory, setFilterStory] = useState(defaultFilter);

  const [isFilter, setIsFilter] = useState(false);
  const [sortValue, setSortValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");

  // Populate Story data
  const fetchStory = async (filter) => {
    try {
      const response = await projectAPI.getAllStories(projectId, filter);
      const data = response.data;
      const cardList = digFind(data, "storyDtoes");
      setFilteredCard({
        isFilter: true,
        cardList: cardList ? cardList : [],
      });
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
    }, 200);

    return () => clearTimeout(delayDebounceFn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStoryValue]);

  useEffect(() => {
    setFilteredCard({ cardList: [], isFilter: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          alignItems={"center"}
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

          <Flex gap={2} alignItems="center">
            <Select
              width="auto"
              onChange={(e) => handleCategoryStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={categoryValue}
            >
              <option value="" disabled>
                Category
              </option>
              <option value="DESIGN">Design(UI/UX)</option>
              <option value="FRONTEND">Front-end</option>
              <option value="BACKEND">Back-end</option>
              <option value="DEVOPS">DevOps</option>
              <option value="TEST">Testing</option>
              <option value="OTHERS">Others</option>
            </Select>

            <Select
              width="auto"
              onChange={(e) => handleSortStory(e.target.value)}
              color={useColorModeValue("#031d46", "#fffdfe")}
              value={sortValue}
            >
              <option value="" disabled>
                Sort by
              </option>
              <option value="pointDsc">Point: High to Low</option>
              <option value="pointAsc">Point: Low to High</option>
              <option value="timeDsc">Recently Created</option>
              <option value="timeAsc">Oldest Created</option>
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
          <Text as="span">Total points: </Text>
          <SkeletonCircle isLoaded={!isLoading}>
            <Circle size={8} color="white" bgColor="gray">
              {totalPoints}
            </Circle>
          </SkeletonCircle>
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
        projectId={projectId}
        participants={participants}
      />
    </>
  );
};

export default BacklogController;
