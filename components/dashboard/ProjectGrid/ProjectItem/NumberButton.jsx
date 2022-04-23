import { Button } from "@chakra-ui/react";

const NumberButton = ({ number }) => {
  const customToggle = (e) => {
    e.stopPropagation();

    // Fetch user task here
    console.log("Hello");
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
        boxShadow={
          "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
        }
        onClick={(e) => customToggle(e)}
      >
        {number}
      </Button>
    </>
  );
};

export default NumberButton;
