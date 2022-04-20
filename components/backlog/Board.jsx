import { Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Board = ({ children }) => {
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  return (
    <Flex direction="row" w="full">
      {React.Children.map(children, (child) => child)}
    </Flex>
  );
};

export default Board;
