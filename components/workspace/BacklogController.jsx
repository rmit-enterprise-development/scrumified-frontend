import React from 'react';
import {
	Flex,
	Spacer,
	Text,
	FormControl,
	Select,
	HStack,
	useDisclosure,
	IconButton,
} from '@chakra-ui/react';

import { AddIcon } from '@chakra-ui/icons';

import { IoFilterSharp } from 'react-icons/io5';

import CardModal from './CardModal';

const BacklogController = ({
	cards,
	setCards,
	bg,
	color,
	btnColor,
	btnBg,
	projectId,
	participants,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<FormControl>
			<Flex>
				<HStack py="2">
					<IconButton
						onClick={() => {
							onOpen();
						}}
						aria-label="Search database"
						icon={<IoFilterSharp />}
						display={{ base: 'flex', md: 'none' }}
						alignItems={'center'}
					/>
					<Select
						placeholder="Select option"
						display={{ base: 'none', md: 'block' }}
					>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</Select>
					<IconButton
						onClick={() => {
							onOpen();
						}}
						aria-label="Search database"
						icon={<IoFilterSharp />}
						display={{ base: 'flex', md: 'none' }}
						alignItems={'center'}
					/>
					<Select
						placeholder="Select option"
						display={{ base: 'none', md: 'block' }}
					>
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</Select>
				</HStack>
				<Spacer />
				<HStack gap="2">
					<Text>Total points: 8</Text>
					<IconButton
						_hover={{ opacity: 0.8 }}
						bg={btnBg}
						onClick={() => {
							onOpen();
						}}
						aria-label="Search database"
						icon={<AddIcon />}
					/>
				</HStack>
			</Flex>
			<CardModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				cards={cards}
				setCards={setCards}
				color={color}
				bg={bg}
				btnBg={btnBg}
				btnColor={btnColor}
				projectId={projectId}
				participants={participants}
			/>
		</FormControl>
	);
};

export default BacklogController;
