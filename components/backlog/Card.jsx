import { Box, Flex, Heading, Spacer, Text } from '@chakra-ui/react';
import React from 'react';

const Card = ({ story, category, points }) => {
	return (
		<Box p={5} shadow="md" borderWidth="1px">
			<Heading fontSize="xl">{story}</Heading>
			<Flex mt={4}>
				<Text>Category: {category}</Text>
				<Spacer />
				<Text>Story Points: {points}</Text>
			</Flex>
		</Box>
	);
};

export default Card;
