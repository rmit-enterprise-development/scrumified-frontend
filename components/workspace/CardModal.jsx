import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Select,
	Textarea,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const CardModal = ({
	isOpen,
	onClose,
	cards,
	setCards,
	color,
	bg,
	btnBg,
	btnColor,
	projectId,
	participants,
	prevCard,
}) => {
	console.log(prevCard);
	// const userStory = prevCard.userStory;
	// const asA = userStory.split(',');
	let initCard = {
		asA: '',
		iNeed: '',
		soThat: '',
		point: '',
		category: '',
		def: '',
		participant: 0,
	};
	if (!!prevCard) {
		initCard = {
			asA: 'Hello',
			iNeed: '',
			soThat: '',
			point: prevCard.point,
			category: '',
			def: 'Hello',
			participant: 0,
		};
	}
	const [card, setCard] = useState(initCard);

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

		fetch(
			`https://scrumified-dev-bakend.herokuapp.com/projects/${projectId}/stories`,
			requestOptions
		)
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
								value={prevCard ? prevCard.userStory : ''}
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
							Assignee:
						</FormLabel>
						<Select
							id="participant"
							placeholder="Select participant"
							onChange={(e) => {
								setCard({
									...card,
									participant: e.target.value,
								});
							}}
						>
							{participants &&
								participants.map((participant, idx) => (
									<option key={idx} value={participant.id}>
										{participant.email}
									</option>
								))}
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
									assignId: card.participant,
								};

								createCard(result);
								setCard({
									asA: '',
									iNeed: '',
									soThat: '',
									point: '',
									category: '',
									def: '',
									participant: 0,
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
