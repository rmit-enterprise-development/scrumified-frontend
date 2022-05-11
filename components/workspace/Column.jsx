import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';

const Column = ({
  title,
  id,
  cards,
  setCards,
  cardList,
  bg,
  color,
  btnBg,
  btnColor,
  bgGradient,
}) => {
  return (
    <Flex
      maxH="75vh"
      overflow="scroll"
      mt={6}
      flexDir={'column'}
      boxSizing="border-box"
      bgGradient={bgGradient}
      boxShadow="base"
      borderRadius={'1rem'}
    >
      <Box padding={'4'}>
        <Text
          textAlign={'center'}
          fontSize="1.5rem"
          fontWeight={'bold'}
          color={color}
        >
          {title}
        </Text>
      </Box>

      {/* {cardList.length === 0 && (
				<NoItem icon={GoTasklist}>
					No Backlog found. Please start create your first backlog!
				</NoItem>
			)} */}

      <Droppable droppableId={id}>
        {(provided) => (
          <Flex
            flexDirection={'column'}
            flexGrow={1}
            ref={provided.innerRef}
            {...provided.droppableProps}
            py={2}
            px={4}
          >
            {cardList}
            {provided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  );
};

export default Column;
