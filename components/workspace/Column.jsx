import { Text, Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ title, id, cards }) => {
	return (
		<Flex flexDir={"column"} borderWidth={'4px'} w={'md'} dir="column">
			<Text>{title}</Text>
			<Droppable droppableId={id}>
				{(provided) => (
					<Box flexGrow={1} {...provided.droppableProps} ref={provided.innerRef}>
						{cards.map((card) => (
							<Card
								key={card.id}
								card={card}
								index={card.position}
							/>
						))}
						{provided.placeholder}
					</Box>
				)}
			</Droppable>
		</Flex>
	);
};

export default Column;
