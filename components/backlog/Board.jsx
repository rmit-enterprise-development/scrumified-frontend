import { Box, Flex, Spacer, UnorderedList, ListItem } from '@chakra-ui/react';
import React, { useState } from 'react';
import Column from './Column';

import SearchBar from './SearchBar';

const Board = () => {
	const [cardList, setCardList] = useState([
		{
			id: 1,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 2,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 3,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
	]);

	return (
		<Box>
			<SearchBar cardList={cardList} setCardList={setCardList} />
			<Column cardList={cardList} setCardList={setCardList} />
		</Box>
	);
};

export default Board;
