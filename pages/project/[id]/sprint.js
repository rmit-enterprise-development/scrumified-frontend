import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import SectionHeader from '../../../components/common/SectionHeader/SectionHeader';
import MainContainer from '../../../components/layout/MainContainer';
import Board from '../../../components/workspace/Board';
import Column from '../../../components/workspace/Column';

import cookies from 'next-cookies';
import { LoggedUserProvider } from '../../../components/common/LoggedUserProvider';
import { Box, useColorModeValue } from '@chakra-ui/react';
import Card from '../../../components/workspace/Card';
import projectAPI from '../../../api/services/projectAPI';
import linkCards from '../../../utils/card/card';

const initData = {
	9: {
		id: 9,
		userStory: 'A',
		category: 'category',
		createdDate: 1652268620,
		point: 4,
		defOfDone: 'abc',
		status: 'todo',
		parentStoryId: null,
		childStoryId: 11,
		projectId: 2,
		sprintId: 4,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'http://127.0.0.1:8989/stories/9',
			},
		],
	},
	11: {
		id: 11,
		userStory: 'B',
		category: 'category',
		createdDate: 1652282290,
		point: 4,
		defOfDone: 'abc',
		status: 'todo',
		parentStoryId: 9,
		childStoryId: null,
		projectId: 2,
		sprintId: 4,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'http://127.0.0.1:8989/stories/11',
			},
		],
	},
	8: {
		id: 8,
		userStory: 'C',
		category: 'category',
		createdDate: 1652171796,
		point: 4,
		defOfDone: null,
		status: 'inProgress',
		parentStoryId: null,
		childStoryId: 10,
		projectId: 2,
		sprintId: 4,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'http://127.0.0.1:8989/stories/8',
			},
		],
	},
	10: {
		id: 10,
		userStory: 'D',
		category: 'category',
		createdDate: 1652282226,
		point: 4,
		defOfDone: 'abc',
		status: 'inProgress',
		parentStoryId: 8,
		childStoryId: null,
		projectId: 2,
		sprintId: 4,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'http://127.0.0.1:8989/stories/10',
			},
		],
	},
	12: {
		id: 12,
		userStory: 'E',
		category: 'category',
		createdDate: 1652282434,
		point: 4,
		defOfDone: 'abc',
		status: 'done',
		parentStoryId: null,
		childStoryId: null,
		projectId: 2,
		sprintId: 4,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'http://127.0.0.1:8989/stories/12',
			},
		],
	},
};
var isEvtSrcOpenedOnce = false;

const Sprint = ({ authToken }) => {
	const { asPath } = useRouter();

	const projectId = asPath.split('/')[2];

	const getParticipants = async () => {
		const response = await projectAPI.getProject(projectId);
		const json = response.data;
		if (json.participants) {
			return [json.owner, ...json.participants];
		} else {
			return [json.owner];
		}
	};

	const getCards = async () => {
		const response = await projectAPI.getAllStories(projectId, {
			isBacklog: true,
		});
		const json = response.data;
		return json;
	};

	const [cards, setCards] = useState(initData);
	const [cardListTodo, setCardListTodo] = useState([]);
	const [cardListinProgress, setcardListinProgress] = useState([]);
	const [cardListDone, setCardListDone] = useState([]);
	const [participants, setParticipants] = useState([]);

	console.log(cards);

	useEffect(() => {
		// getCards().then((data) => {
		// 	return setCards(data);
		// });
		// getParticipants().then((data) => setParticipants(data));
		// const handleReceiveCard = (e) => {
		// 	getCards().then((data) => {
		// 		return setCards(data);
		// 	});
		// };
		// const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
		// let eventSource = new EventSource(uri);
		// eventSource.onopen = (e) => {
		// 	if (isEvtSrcOpenedOnce) {
		// 		// eventSource.close();
		// 	} else {
		// 		isEvtSrcOpenedOnce = true;
		// 	}
		// 	console.log('Open Backlog Event Source!');
		// };
		// eventSource.onmessage = (e) => {
		// 	console.log('on message', e.data);
		// };
		// eventSource.addEventListener('update', handleReceiveCard);
		// return () => {
		// 	eventSource.close();
		// };
	}, []);

	useEffect(() => {
		const participants = [
			{
				id: 2,
				firstName: 'Uncle',
				lastName: 'HoHo',
				email: 'abc@gmail.com',
				description: null,
			},
		];
		setCardListTodo(
			linkCards(cards, 'todo', [
				{
					id: 2,
					firstName: 'Uncle',
					lastName: 'HoHo',
					email: 'abc@gmail.com',
					description: null,
				},
			])
		);
		setcardListinProgress(
			linkCards(cards, 'inProgress', [
				{
					id: 2,
					firstName: 'Uncle',
					lastName: 'HoHo',
					email: 'abc@gmail.com',
					description: null,
				},
			])
		);
		setCardListDone(
			linkCards(cards, 'done', [
				{
					id: 2,
					firstName: 'Uncle',
					lastName: 'HoHo',
					email: 'abc@gmail.com',
					description: null,
				},
			])
		);
		// }, [bg, cards, color]);
	}, [cards]);

	const [winReady, setwinReady] = useState(false);
	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<LoggedUserProvider authToken={authToken}>
			<Head>
				<title>Active Sprint</title>
			</Head>

			<MainContainer>
				<Box>
					<SectionHeader>Active Sprint</SectionHeader>
					{winReady ? (
						<Board
							cards={cards}
							setCards={setCards}
							cardList={{
								todo: cardListTodo,
								inProgress: cardListinProgress,
								done: cardListDone,
							}}
							templateColumns="repeat(3, 1fr)"
						>
							<Column
								key={0}
								title={'Todo'}
								id={'todo'}
								cards={cards}
								setCards={setCards}
								cardList={cardListTodo}
							/>
							<Column
								key={1}
								title={'In Progress'}
								id={'inProgress'}
								cards={cards}
								setCards={setCards}
								cardList={cardListinProgress}
							/>
							<Column
								key={2}
								title={'Done'}
								id={'done'}
								cards={cards}
								setCards={setCards}
								cardList={cardListDone}
							/>
						</Board>
					) : null}
				</Box>
			</MainContainer>
		</LoggedUserProvider>
	);
};

export async function getServerSideProps(ctx) {
	const { auth } = cookies(ctx);
	return { props: { authToken: auth || '' } };
}

export default Sprint;
