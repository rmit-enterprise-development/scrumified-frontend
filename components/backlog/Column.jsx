import React, { useState } from 'react';

import { Box, Flex, VStack } from '@chakra-ui/react';
import Card from './Card';

const Column = ({ cardList, setCardList }) => {
	return (
		<Flex direction={'column'} rowGap={5}>
			{cardList.map((card) => (
				<Card {...card} key={card.id} />
			))}
		</Flex>
	);
};

export default Column;
