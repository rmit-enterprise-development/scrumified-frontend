import { Flex, Grid } from '@chakra-ui/react';
import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import storyAPI from '../../api/services/storyAPI';

const Board = ({
	cards,
	setCards,
	children,
	templateColumns,
	cardList,
	isBacklog,
}) => {
	const updateCardOrder = async (source, target, status, flag) => {
		const updateServiceStatus = await storyAPI.putStory(
			source,
			{
				replaceStoryId: target,
				status: status,
			},
			{
				isDragged: true,
				isTopDown: flag,
			}
		);
	};

	const onDragEnd = (result) => {
		// remove card from the list
		const removeDND = (srcId) => {
			const parent = newCards[srcId].parentStoryId;
			const child = newCards[srcId].childStoryId;

			if (!!parent) {
				newCards[parent].childStoryId = !child ? null : Number(child);
			}

			if (!!child) {
				newCards[child].parentStoryId = !parent ? null : Number(parent);
			}
		};

		// add card back to the list
		const insertTopDND = (srcId, destId, newCards) => {
			newCards[srcId].childStoryId = destId;
			newCards[srcId].parentStoryId = null;
			newCards[destId].parentStoryId = srcId;
		};

		const insertBottomDND = (srcId, destIdx, newCards) => {
			const lastElementId =
				cardList[newCards[srcId].status][destIdx - 1]?.key;
			if (lastElementId) {
				newCards[srcId].parentStoryId = lastElementId;
				newCards[srcId].childStoryId = null;
				newCards[lastElementId].childStoryId = srcId;
			} else {
				newCards[srcId].parentStoryId = null;
				newCards[srcId].childStoryId = null;
			}
		};

		const insertOnTopDest = (srcId, destId, newCards) => {
			newCards[srcId].parentStoryId = !newCards[destId].parentStoryId
				? null
				: Number(newCards[destId].parentStoryId);
			newCards[destId].parentStoryId = Number(srcId);
			newCards[srcId].childStoryId = Number(destId);
			const parentOfSrc = newCards[srcId].parentStoryId;
			if (!!parentOfSrc) {
				newCards[parentOfSrc].childStoryId = Number(srcId);
			}
		};

		const insertBelowDest = () => {
			newCards[srcId].childStoryId = !newCards[destId].childStoryId
				? null
				: Number(newCards[destId].childStoryId);
			newCards[destId].childStoryId = Number(srcId);
			newCards[srcId].parentStoryId = Number(destId);
			const childOfSrc = newCards[srcId].childStoryId;
			if (!!childOfSrc) {
				newCards[childOfSrc].parentStoryId = Number(srcId);
			}
		};

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

		let newCards = { ...cards };
		const srcId = draggableId;
		const destId = isBacklog
			? cardList[destination.index].key
			: cardList[destination.droppableId][destination.index]?.key;

		removeDND(srcId);
		if (destination.droppableId === source.droppableId) {
			// add card back to the list
			if (source.index < destination.index) {
				insertBelowDest(srcId, destId, newCards);
			} else if (source.index > destination.index) {
				insertOnTopDest(srcId, destId, newCards);
			}
		} else {
			newCards[srcId].status = destination.droppableId;
			// add card back to the new column
			if (destId && !newCards[destId].parentStoryId)
				insertTopDND(srcId, destId, newCards);
			else if (!destId)
				insertBottomDND(srcId, destination.index, newCards);
			else insertOnTopDest(srcId, destId, newCards);
		}
		setCards(newCards);
		// updateCardOrder(
		// 	srcId,
		// 	destId,
		// 	destination.droppableId,
		// 	source.index < destination.index
		// );
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Grid columnGap={'5'} templateColumns={templateColumns}>
				{React.Children.map(children, (child) => child)}
			</Grid>
		</DragDropContext>
	);
};

export default Board;
