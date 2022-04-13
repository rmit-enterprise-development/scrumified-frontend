import { Box, Flex, Spacer, UnorderedList, ListItem } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Column from './Column';

import SearchBar from './SearchBar';
import dynamic from 'next/dynamic';

const Board = () => {
	const [cardList, setCardList] = useState([
		{
			id: 1,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'def',
			points: 1,
		},
		{
			id: 2,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 11,
		},
		{
			id: 3,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'ghj',
			points: 12,
		},
	]);

	const [winReady, setwinReady] = useState(false);
	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<Box>
			<SearchBar cardList={cardList} setCardList={setCardList} />
			{winReady ? (
				<Column cardList={cardList} setCardList={setCardList} />
			) : null}
		</Box>
	);
};

export default Board;
