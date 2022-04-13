import React, { useState } from 'react';

import { Box, Flex, VStack } from '@chakra-ui/react';
import Card from './Card';

const Column = () => {
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
		{
			id: 4,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 5,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 6,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 7,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 8,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
		{
			id: 9,
			story: 'As a user I want to do something important to show the world how good I am.',
			category: 'abc',
			points: 1,
		},
	]);
	return (
		<Flex direction={'column'} rowGap={5}>
			{cardList.map((card) => (
				<Card {...card} key={card.id} />
			))}
		</Flex>
	);
};

export default Column;
