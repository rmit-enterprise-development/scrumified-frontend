import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Textarea,
	Select,
	Text,
	useColorMode,
	useColorModeValue,
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { CUIAutoComplete } from 'chakra-ui-autocomplete';
import React, { useState } from 'react';

const CardModal = ({ isOpen, onOpen, onClose, data, setData }) => {
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
	]);

	const participantList = userList.map((a) => {
		const userInfo = a.name + ' (' + a.email + ')';
		return { value: a.id, label: userInfo };
	});

	const [selectedItems, setSelectedItems] = useState([]);
	const { colorMode } = useColorMode();

	const [pickerItems, setPickerItems] = useState(
		participantList.sort((a, b) => a.label.localeCompare(b.label))
	);

	const handleSelectedItemsChange = (selectedItems) => {
		if (selectedItems) {
			setSelectedItems(selectedItems);
		}
	};

	const customRender = (selected) => {
		return (
			<Flex flexDir="row" alignItems={'center'}>
				<Avvvatars value={selected.label}/>

				{colorMode === 'dark' ? (
					<Text pl={5} color="#fffdfe">
						{selected.label}
					</Text>
				) : (
					<Text pl={5} color="#031d46">
						{selected.label}
					</Text>
				)}
			</Flex>
		);
	};

	const customCreateItemRender = (value) => {
		return (
			<Text as="span" color="red.500" fontWeight="bold">
				User not found!
			</Text>
		);
	};

	const [card, setCard] = useState({
		asA: '',
		iNeed: '',
		soThat: '',
		point: '',
		category: '',
		def: '',
	});

	const [isValidAsA, setIsValidAsA] = useState(false);
	const [isValidINeed, setIsValidINeed] = useState(false);
	const [isValidSoThat, setIsValidSoThat] = useState(false);
	const [isValidPoint, setIsValidPoint] = useState(false);
	const [isValidDef, setIsValidDef] = useState(false);

	const isValidInput = (value) => value.length > 0;

	const createCard = (submitData) => {
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(submitData),
		};

		fetch('http://127.0.0.1:8989/projects/1/stories', requestOptions)
			.then(async (response) => {
				const isJson = response.headers
					.get('content-Type')
					?.includes('application/json');
				const data = isJson && (await response.json());

				if (!response.ok) {
					const error = (data && data.message) || response.status;
					return Promise.reject(error);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
	return (
		<Modal
			isCentered
			isOpen={isOpen}
			onClose={onClose}
			width={'100%'}
			height={'100%'}
		>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent borderRadius={'1rem'} padding={'1rem'}>
				<ModalHeader>Create User Story</ModalHeader>
				<ModalBody>
					<FormControl>
						<Flex>
							<FormLabel htmlFor="person" fontSize={'2xl'}>
								As a
							</FormLabel>
							<Input
								id="person"
								flex={1}
								variant="flushed"
								placeholder="User"
								onChange={(e) => {
									setCard({ ...card, asA: e.target.value });
									setIsValidAsA(isValidInput(e.target.value));
								}}
							/>
						</Flex>
					</FormControl>

					<FormControl mt={4}>
						<Flex>
							<FormLabel htmlFor="todo" fontSize={'2xl'}>
								I need
							</FormLabel>
							<Input
								id="todo"
								flex={1}
								variant="flushed"
								placeholder="Todo task"
								onChange={(e) => {
									setCard({ ...card, iNeed: e.target.value });
									setIsValidINeed(
										isValidInput(e.target.value)
									);
								}}
							/>
						</Flex>
					</FormControl>

					<FormControl mt={4}>
						<Flex>
							<FormLabel htmlFor="explaination" fontSize={'2xl'}>
								So that
							</FormLabel>
							<Input
								id="explaination"
								flex={1}
								variant="flushed"
								placeholder="Explaination"
								onChange={(e) => {
									setCard({
										...card,
										soThat: e.target.value,
									});
									console.log(isValidInput(e.target.value));
									setIsValidSoThat(
										isValidInput(e.target.value)
									);
								}}
							/>
						</Flex>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="definition" fontSize={'2xl'}>
							Definition of Done
						</FormLabel>
						<Textarea
							id="definition"
							placeholder="Here is a sample placeholder"
							resize={'none'}
							onChange={(e) => {
								setCard({ ...card, def: e.target.value });
								setIsValidDef(isValidInput(e.target.value));
							}}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="point" fontSize={'2xl'}>
							Story point:
						</FormLabel>
						<Select
							id="point"
							placeholder="Select point"
							onChange={(e) => {
								setCard({ ...card, point: e.target.value });
								setIsValidPoint(isValidInput(e.target.value));
							}}
						>
							<option value="1">1 point</option>
							<option value="3">3 point</option>
							<option value="5">5 point</option>
						</Select>
					</FormControl>

					<FormControl mt={4} isRequired>
						<CUIAutoComplete
							tagStyleProps={{
								rounded: 'full',
							}}
							label="Participants"
							placeholder="Enter a participant's email"
							onCreateItem={() => {}} //Empty because don't want to add option in list. Please see the example in "https://www.npmjs.com/package/chakra-ui-autocomplete"
							items={pickerItems}
							itemRenderer={customRender}
							createItemRenderer={customCreateItemRender}
							selectedItems={selectedItems}
							onSelectedItemsChange={(changes) => {
								console.log(changes);
								return handleSelectedItemsChange(
									changes.selectedItems
								);
							}}
							hideToggleButton={true}
							listStyleProps={{
								maxHeight: '200',
								overflow: 'auto',
								bg: useColorModeValue('', '#2D3748'),
							}}
							listItemStyleProps={{
								cursor: 'pointer',
								_hover: {
									bg: useColorModeValue('', '#031e49'),
								},
							}}
							labelStyleProps={{
								color: useColorModeValue('#031e49', '#fffdfe'),
							}}
							inputStyleProps={{
								color: useColorModeValue('#031d46', '#fffdfe'),
							}}
						/>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose} mr={4}>
						Close
					</Button>
					<Button
						onClick={() => {
							if (
								isValidAsA &&
								isValidINeed &&
								isValidSoThat &&
								isValidDef &&
								isValidPoint
							) {
								const result = {
									// id: Math.floor(Math.random() * 10000),
									userStory:
										'As a ' +
										card.asA +
										', I need ' +
										card.iNeed +
										'. So that, ' +
										card.soThat,
									point: card.point,
									category: 'abc',
									def: card.def,
									status: 'backlog',
									position: data.filter(
										(card) => card.status === 'backlog'
									).length,
									assignId: 1,
								};
								setData([...data, result]);
								createCard(result);
								setCard({
									asA: '',
									iNeed: '',
									soThat: '',
									point: '',
									category: '',
									def: '',
								});
								setIsValidAsA(false);
								setIsValidINeed(false);
								setIsValidSoThat(false);
								setIsValidPoint(false);
								setIsValidDef(false);
								onClose();
							}
						}}
					>
						Submit
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CardModal;

// export async function getStaticProps() {
// 	const res = await fetch('http://127.0.0.1:8989/users/');
// 	const cards = await res.json();
// 	if (cards['_embedded']) {
// 		return {
// 			props: {
// 				cards: cards['_embedded'].storyDtoList,
// 			},
// 			revalidate: 5,
// 		};
// 	}
// 	return {
// 		props: {
// 			cards: [],
// 		},
// 		revalidate: 5,
// 	};
// }
