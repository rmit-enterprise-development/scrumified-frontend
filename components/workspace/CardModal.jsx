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
	console.log(participants);
	let initCard = {
		userStory: '',
		point: '',
		category: '',
		def: '',
		assignId: 0,
	};
	if (!!prevCard) {
		initCard = prevCard;
		console.log(prevCard);
	}

	const [card, setCard] = useState(initCard);
	const [isValidUserStory, setIsValidUserStory] = useState(false);
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
			onClose={() => {
				setCard(initCard);
				onClose();
			}}
			scrollBehavior={'inside'}
		>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent borderRadius={'1rem'} padding={'1rem'}>
				<ModalHeader color={color}>Create User Story</ModalHeader>
				<ModalBody color={color}>
					<FormControl mt={4}>
						<FormLabel htmlFor="userStory" fontSize={'lg'}>
							User Story
						</FormLabel>
						<Textarea
							id="userStory"
							defaultValue={card.userStory}
							placeholder="As a ... I need ... So that ..."
							resize={'none'}
							onBlur={(e) => {
								setCard({ ...card, userStory: e.target.value });
								setIsValidUserStory(
									isValidInput(e.target.value)
								);
							}}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="definition" fontSize={'lg'}>
							Definition of Done
						</FormLabel>
						<Textarea
							id="definition"
							defaultValue={card.def}
							placeholder="Requirement to complete a task"
							resize={'none'}
							onBlur={(e) => {
								setCard({ ...card, def: e.target.value });
								setIsValidDef(isValidInput(e.target.value));
							}}
						/>
					</FormControl>

					<FormControl mt={4}>
						<FormLabel htmlFor="point" fontSize={'lg'}>
							Story point:
						</FormLabel>
						<Select
							id="point"
							defaultValue={card.point}
							placeholder="Select point"
							onBlur={(e) => {
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
						<FormLabel htmlFor="participant" fontSize={'lg'}>
							Assignee:
						</FormLabel>
						<Select
							id="participant"
							defaultValue={card.assignId}
							placeholder="Select participant"
							onBlur={(e) => {
								setCard({
									...card,
									assignId: e.target.value,
								});
							}}
						>
							{participants &&
								participants.map((participant, idx) => (
									<option
										key={idx}
										value={participant.id}
										selected={
											card.assignId === participant.id
										}
									>
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
							!(isValidUserStory && isValidDef && isValidPoint)
						}
						onClick={() => {
							if (
								isValidUserStory &&
								isValidDef &&
								isValidPoint
							) {
								const result = {
									userStory: card.userStory,
									point: card.point,
									category: 'abc',
									def: card.def,
									status: 'backlog',
									assignId: card.assignId,
								};

								createCard(result);
								setCard({
									userStory: '',
									point: '',
									category: '',
									def: '',
									assignId: 0,
								});

								setIsValidUserStory(false);
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
