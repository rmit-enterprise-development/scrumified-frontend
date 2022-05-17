import { Box, Button, Collapse, Icon, Skeleton, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import NoItem from "../common/NoItem/NoItem";
import StaticCardRoadmap  from "./StaticCardRoadmap";
import { GoInfo } from "react-icons/go";

const CompletedSprints = ( {sprintList} ) => {
    const { isOpen, onToggle } = useDisclosure();
    const doneSprints = [];
    sprintList.forEach((sprint) => {
        if (sprint.status == "done") {
            doneSprints.push(sprint);
        }
    });

    return (
      <>
        <Box 
            onClick={onToggle}
            color="white"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Text
                fontSize="3xl"
                fontWeight="bold"
                color={useColorModeValue("#031d46", "#fffdfe")}
                py={3}
            >
                Sprints Archive
            </Text>
            <Button colorScheme="teal">
                Show more
            </Button>

        </Box>
        <Collapse in={isOpen} animateOpacity>
          <Box>
            { doneSprints.length > 0 ? (doneSprints.map((sprint) => ( <StaticCardRoadmap sprint={sprint} /> ))) : <NoItem icon={GoInfo} >No Sprint Completed</NoItem>}
          </Box>
        </Collapse>
      </>
    )
  }

export default CompletedSprints;