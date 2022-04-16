import { Box, Heading, Flex, Text, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const Card = (props) => {
	return (
		<Draggable draggableId={'' + props.card.id} index={props.index}>
			{(provided) => (
				<Box
					p={5}
					shadow="md"
					borderWidth="1px"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<Heading fontSize="xl" isTruncated>
						{props.card.userStory}
					</Heading>
					<Flex mt={4}>
						<Text>Category: {props.card.category}</Text>
						<Spacer />
						<Text>Story Points: {props.card.point}</Text>
					</Flex>
				</Box>
			)}
		</Draggable>
	);
};

export default Card;
