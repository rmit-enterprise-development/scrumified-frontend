import { Text, Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ title, id, cards }) => {
	console.log(cards);
	return (
		<Flex
			flexDir={'column'}
			// w={{ base: '20%', md: '40%' }}
			dir="column"
			boxSizing="border-box"
			overflow="hidden"
			bgGradient="linear(gray.50 0%, gray.100 100%)"
			boxShadow="base"
			borderRadius={'1rem'}
		>
			<Box padding={'4'}>
				<Text
					textAlign={'center'}
					// color={'white'}
					fontSize={'xl'}
					fontWeight={'bold'}
				>
					{title}
				</Text>
			</Box>
			<Droppable droppableId={id}>
				{(provided) => (
					<Box
						flexGrow={1}
						ref={provided.innerRef}
						{...provided.droppableProps}
						padding={'2'}
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
