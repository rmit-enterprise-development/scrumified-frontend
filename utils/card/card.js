import { useColorModeValue } from '@chakra-ui/react';
import Card from '../../components/workspace/Card';

export default function linkCards(cards, category) {
	console.log(cards);
	const participants = [
		{
			id: 2,
			firstName: 'Uncle',
			lastName: 'HoHo',
			email: 'abc@gmail.com',
			description: null,
		},
	];
	let renderCards = [];

	let tmp = null;
	for (let key in cards) {
		console.log(cards[key]);
		if (
			cards.hasOwnProperty(key) &&
			!cards[key].parentStoryId &&
			cards[key].status === category
		) {
			tmp = cards[key];
			break;
		}
	}

	if (!tmp) {
		return renderCards;
	}

	let i = 0;
	while (true) {
		renderCards.push(
			<Card
				key={tmp.id}
				card={tmp}
				index={i++}
				participants={participants}
			/>
		);
		if (!!tmp.childStoryId) tmp = cards[tmp.childStoryId];
		else break;
	}
	console.log(renderCards);
	return renderCards;
}
