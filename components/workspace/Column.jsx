import { Text, Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ title, id, cards }) => {
	console.log(cards);
	return (
		<Flex flexDir={'column'} borderWidth={'4px'} w={'md'} dir="column">
			<Text>{title}</Text>
			<Droppable droppableId={id}>
				{(provided) => (
					<Box
						flexGrow={1}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
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
