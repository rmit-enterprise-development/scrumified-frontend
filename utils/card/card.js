import { useColorModeValue } from '@chakra-ui/react';
import Card from '../../components/workspace/Card';

export default function linkCards(cards, category, participants) {
	let renderCards = [];
	let tmp = null;
	for (let key in cards) {
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
	return renderCards;
}
