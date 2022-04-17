import { Box, Flex, Spacer, UnorderedList, ListItem } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import Column from './Column';

import SearchBar from './SearchBar';
import dynamic from 'next/dynamic';

const Board = ({ children }) => {
	const [winReady, setwinReady] = useState(false);
	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<Flex direction="row" w="full">
			{React.Children.map(children, (child) => child)}
		</Flex>
	);
};

export default Board;
