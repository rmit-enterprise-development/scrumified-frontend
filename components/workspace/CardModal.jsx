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
import React, { useState, useEffect } from 'react';

const CardModal = ({
	isOpen,
	onOpen,
	onClose,
	cards,
	setCards,
	color,
	bg,
	btnBg,
	btnColor,
	projectId,
	participants,
}) => {
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
			scrollBehavior={'inside'}
		>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent borderRadius={'1rem'} padding={'1rem'}>
				<ModalHeader color={color}>Create User Story</ModalHeader>
				<ModalBody color={color}>
					<FormControl>
						<Flex alignItems={'center'}>
							<FormLabel
								htmlFor="person"
								fontSize={'xl'}
								marginBottom={0}
							>
								As a
							</FormLabel>
							<Input
								id="person"
								flex={1}
								paddingX={'0.5rem'}
								variant="flushed"
								placeholder="Who is responsible?"
								onChange={(e) => {
									setCard({ ...card, asA: e.target.value });
									setIsValidAsA(isValidInput(e.target.value));
								}}
							/>
						</Flex>
					</FormControl>

					<FormControl mt={4}>
						<Flex alignItems={'center'}>
							<FormLabel
								htmlFor="todo"
								fontSize={'xl'}
								marginBottom={0}
							>
								I need
							</FormLabel>
							<Input
								id="todo"
								flex={1}
								paddingX={'0.5rem'}
								variant="flushed"
								placeholder="What is the task?"
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
						<Flex alignItems={'center'}>
							<FormLabel
								htmlFor="explaination"
								fontSize={'xl'}
								marginBottom={0}
							>
								So that
							</FormLabel>
							<Input
								id="explaination"
								flex={1}
								paddingX={'0.5rem'}
								variant="flushed"
								placeholder="Why does the task is important?"
								onChange={(e) => {
									setCard({
										...card,
										soThat: e.target.value,
									});
									setIsValidSoThat(
										isValidInput(e.target.value)
									);
								}}
							/>
						</Flex>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="definition" fontSize={'xl'}>
							Definition of Done
						</FormLabel>
						<Textarea
							id="definition"
							placeholder="Requirement to complete a task"
							resize={'none'}
							onChange={(e) => {
								setCard({ ...card, def: e.target.value });
								setIsValidDef(isValidInput(e.target.value));
							}}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="point" fontSize={'xl'}>
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
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="5">5</option>
							<option value="8">8</option>
							<option value="13">13</option>
						</Select>
					</FormControl>

					<FormControl mt={4}></FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="participant" fontSize={'xl'}>
							Participant:
						</FormLabel>
						<Select
							id="participant"
							placeholder="Select participant"
							onChange={(e) => {
								setCard({ ...card, point: e.target.value });
								setIsValidPoint(isValidInput(e.target.value));
							}}
						>
							<option value="1">User name</option>
						</Select>
					</FormControl>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme={'red'}
						variant={'outline'}
						onClick={onClose}
						mr={4}
					>
						Close
					</Button>
					<Button
						colorScheme={'telegram'}
						isDisabled={
							!(
								isValidAsA &&
								isValidINeed &&
								isValidSoThat &&
								isValidDef &&
								isValidPoint
							)
						}
						onClick={() => {
							if (
								isValidAsA &&
								isValidINeed &&
								isValidSoThat &&
								isValidDef &&
								isValidPoint
							) {
								const result = {
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