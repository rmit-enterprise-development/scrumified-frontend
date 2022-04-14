import { Button, ButtonProps, Flex } from "@chakra-ui/react";

export default function NumberButton({ bgColor, children }) {
  return (
    <Button
      px={4}
      size="xs"
      rounded={"full"}
      colorScheme={bgColor}
      color={"white"}
      w={2}
      boxShadow={
        "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
      }
    >
      {children}
    </Button>
  );
}
