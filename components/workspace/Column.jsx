import { Text, Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { GoTasklist } from 'react-icons/go';
import NoItem from '../common/NoItem/NoItem';
import Card from './Card';

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
      flexDir={'column'}
      dir="column"
      boxSizing="border-box"
      overflow="hidden"
      bgGradient={bgGradient}
      boxShadow="base"
      borderRadius={'1rem'}
      py={2.5}
      px={4}
    >
      <Text
        textAlign={'center'}
        fontSize={'xl'}
        fontWeight={'bold'}
        color={color}
        p={4}
      >
        {title}
      </Text>

      {cardList.length === 0 && (
        <NoItem icon={GoTasklist}>
          No item found. Create your first story!
        </NoItem>
      )}

      <Droppable droppableId={id}>
        {(provided) => (
          <Flex
            flexDirection={'column'}
            flexGrow={1}
            ref={provided.innerRef}
            {...provided.droppableProps}
            padding={'2'}
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
