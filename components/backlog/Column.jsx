import React, { useState } from 'react';
import {
	DragDropContext,
	Droppable,
	Draggable,
	resetServerContext,
} from 'react-beautiful-dnd';

import { Box, Flex, VStack } from '@chakra-ui/react';
import Card from './Card';

const Column = ({ cardList, setCardList }) => {
	resetServerContext();
	const handleOnDragEnd = (result) => {
		const items = Array.from(cardList);
		const [reorderedItem] = items.splice(result.source.index, 1);
		if (result.destination === null) {
			return;
		}
		items.splice(result.destination.index, 0, reorderedItem);
		setCardList(items);
	};
	return (
		// direction={'column'} rowGap={5}
		<Box>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<Droppable droppableId="abc">
					{(provided) => {
						return (
							<Box
								{...provided.droppableProps}
								ref={provided.innerRef}
							>
								{cardList.map((card, idx) => {
									return (
										<Draggable
											key={card.id}
											draggableId={'' + card.id}
											index={idx}
										>
											{(provided) => (
												<Box
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<Card
														story={card.story}
														category={card.category}
														points={card.points}
													/>
												</Box>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</Box>
						);
					}}
				</Droppable>
			</DragDropContext>
		</Box>
	);
};

export default Column;
