import { Text, Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';

const Column = ({ title, id, cards, setCards, cardList }) => {
	return (
		<Flex
			flexDir={'column'}
			// w={{ base: '20%', md: '40%' }}
			dir="column"
			boxSizing="border-box"
			overflow="hidden"
			// bgGradient="linear(gray.50 0%, gray.100 100%)"
			bgGradient={useColorModeValue(
				'linear(gray.50 0%, gray.100 100%)',
				'linear(blue.800 0%, blue.900 100%)'
			)}
			boxShadow="base"
			borderRadius={'1rem'}
		>
			<Box padding={'4'}>
				<Text
					textAlign={'center'}
					fontSize={'xl'}
					fontWeight={'bold'}
					color={useColorModeValue('#031d46', '#fffdfe')}
				>
					{title}
				</Text>
			</Box>
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
