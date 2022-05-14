import { Flex, Tag, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { GoTasklist } from 'react-icons/go';
import NoItem from '../common/NoItem/NoItem';

const Column = ({ title, id, cardList, isSprint, columnColor }) => {
	let color = useColorModeValue('#031d46', '#fffdfe');

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
			mb={4}
			h="77vh"
		>
			<Flex alignItems={'center'}>
				<Text
					textAlign={'center'}
					fontSize={'1.5rem'}
					fontWeight={'bold'}
					color={color}
					p={4}
				>
					{title}
				</Text>

				<Tag
					textAlign={'center'}
					borderRadius={'0.5rem'}
					size={'6'}
					px={'6px'}
					py={'4px'}
					bgColor={columnColor}
					color={'white'}
				>
					12 Cards
				</Tag>
			</Flex>
			<Droppable droppableId={id}>
				{(provided) => (
					<Flex
						flexDirection={'column'}
						flexGrow={1}
						ref={provided.innerRef}
						{...provided.droppableProps}
						padding={'2'}
						overflow={'auto'}
						h="20rem"
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
