import {
	Box,
	Button,
	Heading,
	Flex,
	Text,
	Spacer,
	useDisclosure,
	IconButton,
	Grid,
} from '@chakra-ui/react';

import { EditIcon } from '@chakra-ui/icons';

import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const Card = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const colorScheme = 'red' + '.500';
	return (
		<Draggable draggableId={'' + props.card.id} index={props.index}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onClick={() => {
						onOpen();
					}}
					boxSizing="border-box"
					borderRadius="1rem"
					overflow="hidden"
					bg={'white'}
					mb={4}
					boxShadow="base"
				>
					<Flex bgColor={'red.500'} padding={'2px'}>
						<IconButton
							onClick={() => {
								onOpen();
							}}
							aria-label="Search database"
							icon={<EditIcon />}
							isRound={true}
							size={'sm'}
							margin={'5px'}
						/>
					</Flex>
					<Box p={5}>
						<Flex alignItems={'center'}>
							<Heading fontSize="xl" isTruncated>
								{props.card.userStory}
							</Heading>
						</Flex>
						<Flex mt={4}>
							<Text>Category: {props.card.category}</Text>
							<Spacer />
							<Text>Story Points: {props.card.point}</Text>
						</Flex>
					</Box>
					<CardModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						// data={data}
						// setData={setData}
						// card={props.card}
					/>
				</Box>
			)}
		</Draggable>
	);
};

export default Card;
