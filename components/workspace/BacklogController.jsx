import React, {useState} from 'react';
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
} from '@chakra-ui/react';

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
	return (
		<FormControl>
			<Flex>
				<HStack py="2">
					<InputGroup>
						<Input placeholder="Basic usage" />
					</InputGroup>
					<Select placeholder="Select option">
						<option value="option1">Option 1</option>
						<option value="option2">Option 2</option>
						<option value="option3">Option 3</option>
					</Select>
					<Box>
						<Button>Button</Button>
					</Box>
				</HStack>
				<Spacer />
				<HStack gap="2">
					<Text>Total points: 8</Text>
					<Button
						onClick={() => {
							onOpen();
						}}
					>
						Create User Card
					</Button>
				</HStack>
			</Flex>
			<CardModal
				isOpen={isOpen}
				onOpen={onOpen}
				onClose={onClose}
				data={data}
				setData={setData}
				participantList={userList.map((a) => {
					const userInfo = a.name + ' (' + a.email + ')';
					return { value: a.id, label: userInfo };
				})}
			/>
		</FormControl>
	);
};

export default BacklogController;
