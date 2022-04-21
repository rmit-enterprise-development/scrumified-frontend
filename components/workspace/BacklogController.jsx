import React, { useState } from 'react';
import {
	Flex,
	Spacer,
	Text,
	Box,
	InputGroup,
	Input,
	Button,
	FormControl,
	Select,
	HStack,
	useDisclosure,
	IconButton,
} from '@chakra-ui/react';

import { AddIcon, HamburgerIcon } from '@chakra-ui/icons';

import { IoFilterSharp } from 'react-icons/io5';

import CardModal from './CardModal';

const BacklogController = ({ data, setData }) => {
	const [userList, setUserList] = useState([
		{
			id: '1',
			name: 'Minh Pham',
			email: 'pcminh0505@gmail.com',
		},
		{
			id: '3',
			name: 'Thach Ho',
			email: 'thachho@123@gmail.com',
		},
		{
			id: '2',
			name: 'Khang Nguyen',
			email: 'khangnguyen111101@gmail.com',
		},
		{
			id: '5',
			name: 'Duong Nguyen',
			email: 'duongnguyen123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
		{
			id: '4',
			name: 'An Le',
			email: 'andrew123@gmail.com',
		},
	]);
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [iconFilter, setIConFilter] = useState('');
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
				data={data}
				setData={setData}
			/>
		</FormControl>
	);
};

export default BacklogController;
