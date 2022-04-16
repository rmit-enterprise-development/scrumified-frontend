import { Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

const Board = ({ data, setData, children }) => {
	const onDragEnd = (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		console.log(destination, source, draggableId);

		if (destination.droppableId === source.droppableId) {
			const newData = Array.from(data);
			const sourceCard = newData.filter(
				(card) => card.id == draggableId
			)[0];
			const destinationCard = newData.filter(
				(card) =>
					card.position === destination.index &&
					card.status === destination.droppableId
			)[0];
			[sourceCard.position, destinationCard.position] = [
				destinationCard.position,
				sourceCard.position,
			];
			setData(newData);
		} else {
			const newData = Array.from(data);
			const sourceCard = newData.filter(
				(card) => card.id === draggableId
			)[0];

			newData.map((card) => {
				card.position >= destination.index &&
				card.status === destination.droppableId
					? card.position++
					: card.position;
			});

			sourceCard.position = destination.index;
			sourceCard.status = destination.droppableId;

			setData(newData);
		}
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Flex columnGap={4}>
				{React.Children.map(children, (child) => child)}
			</Flex>
		</DragDropContext>
	);
};

export default Board;
