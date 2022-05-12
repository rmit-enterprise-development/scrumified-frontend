import { Button } from "@chakra-ui/react";

const NumberButton = ({ id, openTask, fetchProjectStory }) => {
  const customToggle = (e) => {
    e.stopPropagation();
    // Fetch user task here
    fetchProjectStory(id);
  };
  return (
    <>
      <Button
        px={4}
        size="xs"
        rounded={"full"}
        bg="red.500"
        color="white"
        w={2}
        onClick={(e) => customToggle(e)}
        _hover={{
          boxShadow:
            "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)",
        }}
      >
        {openTask}
      </Button>
    </>
  );
};

export default NumberButton;
