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
			console.log(sourceCard);
			newData.map((card) => {
				if (card.status === destination.droppableId) {
					if (source.index > destination.index) {
						source.index >= card.position &&
						card.position >= destination.index
							? card.position++
							: card.position;
					} else {
						source.index <= card.position &&
						card.position <= destination.index
							? card.position--
							: card.position;
					}
				}
			});

			sourceCard.position = destination.index;
			sourceCard.status = destination.droppableId;

			setData(newData);
		} else {
			const newData = Array.from(data);
			const sourceCard = newData.filter(
				(card) => card.id == draggableId
			)[0];

			newData.map((card) => {
				if (
					card.status === destination.droppableId &&
					card.position >= destination.index
				) {
					card.position++;
				} else if (
					card.status === source.droppableId &&
					card.position >= source.index
				) {
					card.position--;
				}
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
