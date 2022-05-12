import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { GoTasklist } from 'react-icons/go';
import NoItem from '../common/NoItem/NoItem';

const Column = ({ title, id, cardList, color }) => {
	return (
		<Flex
			flexDir={'column'}
			dir="column"
			boxSizing="border-box"
			bgGradient={useColorModeValue(
				'linear(gray.50 0%, gray.100 100%)',
				'linear(blue.800 0%, blue.900 100%)'
			)}
			boxShadow="base"
			borderRadius={'1rem'}
			py={2.5}
			transition="all 0.5s linear"
			px={4}
			mb={5}
			// maxH="24.5vh"
			_hover={
				{
					// maxHeight: '77vh',
				}
			}
			overflow="scroll"
		>
			<Text
				textAlign={'center'}
				fontSize={'1.5rem'}
				fontWeight={'bold'}
				color={color}
				p={4}
			>
				{title}
			</Text>
			<Droppable droppableId={id}>
				{(provided) => (
					<Flex
						flexDirection={'column'}
						flexGrow={1}
						ref={provided.innerRef}
						{...provided.droppableProps}
						padding={'2'}
					>
						{cardList && cardList.length === 0 && (
							<NoItem icon={GoTasklist}>
								No item found. Create your first story!
							</NoItem>
						)}
						{cardList}
						{provided.placeholder}
					</Flex>
				)}
			</Droppable>
		</Flex>
	);
};

export default Column;
