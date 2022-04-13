import { Box, Flex, Spacer, UnorderedList, ListItem } from '@chakra-ui/react';
import React from 'react';
import Column from './Column';

import SearchBar from './SearchBar';

const Board = () => {
	return (
		<Box>
			<SearchBar />
			<Column />
		</Box>
	);
};

export default Board;
