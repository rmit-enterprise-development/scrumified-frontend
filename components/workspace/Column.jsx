import { Text, Box, Flex, Grid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
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
		>
			<Box padding={'4'}>
				<Text
					textAlign={'center'}
					fontSize={'xl'}
					fontWeight={'bold'}
					color={color}
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
