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
} from '@chakra-ui/react';
import React from 'react';

const CardModal = ({ isOpen, onOpen, onClose }) => {
	return (
		<Modal isCentered isOpen={isOpen} onClose={onClose}>
			<ModalOverlay
				bg="blackAlpha.300"
				backdropFilter="blur(10px)"
			/>
			<ModalContent>
				<ModalHeader>Create User Story</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>Custom backdrop filters!</Text>
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CardModal;
