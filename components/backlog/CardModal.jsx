import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Text,
	Button,
	FormControl,
	FormLabel,
	Input,
	Flex,
	Textarea,
	Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const CardModal = ({ isOpen, onOpen, onClose, cardList, setCardList }) => {
	const [card, setCard] = useState({
		asA: '',
		iNeed: '',
		soThat: '',
		points: '',
		category: '',
		def: '',
	});

	const [isValidAsA, setIsValidAsA] = useState(false);
	const [isValidINeed, setIsValidINeed] = useState(false);
	const [isValidSoThat, setIsValidSoThat] = useState(false);
	const [isValidPoints, setIsValidPoints] = useState(false);
	const [isValidDef, setIsValidDef] = useState(false);

	const isValidInput = (value) => value.length > 0;
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
			<ModalContent>
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
						<FormLabel htmlFor="points" fontSize={'2xl'}>
							Story points:
						</FormLabel>
						<Select
							id="points"
							placeholder="Select points"
							onChange={(e) => {
								setCard({ ...card, points: e.target.value });
								setIsValidPoints(isValidInput(e.target.value));
							}}
						>
							<option value="1">1 points</option>
							<option value="3">3 points</option>
							<option value="5">5 points</option>
						</Select>
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
								isValidPoints
							) {
								setCardList([
									...cardList,
									{
										story:
											'As a ' +
											card.asA +
											', I need ' +
											card.iNeed +
											'. So that, ' +
											card.soThat,
										points: card.points,
										// category: card.category,
										def: card.def,
									},
								]);
								setCard({
									asA: '',
									iNeed: '',
									soThat: '',
									points: '',
									category: '',
									def: '',
								});
									setIsValidAsA(false);
									setIsValidINeed(false);
									setIsValidSoThat(false);
									setIsValidPoints(false);
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
