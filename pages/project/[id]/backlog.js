import { Box, useColorModeValue } from '@chakra-ui/react';
import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { LoggedUserProvider } from '../../../components/common/LoggedUserProvider';
import SectionHeader from '../../../components/common/SectionHeader/SectionHeader';
import MainContainer from '../../../components/layout/MainContainer';
import BacklogController from '../../../components/workspace/BacklogController';
import Board from '../../../components/workspace/Board';
import Card from '../../../components/workspace/Card';
import Column from '../../../components/workspace/Column';

const initData = {
	2: {
		id: 2,
		userStory: 'Border',
		category: 'category',
		point: 4,
		status: 'backlog',
		parentStoryId: null,
		childStoryId: 1,
		projectId: 1,
		sprintId: null,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'https://scrumified-dev-bakend.herokuapp.com/stories/2',
			},
		],
	},
	4: {
		id: 4,
		userStory: 'Dunky',
		category: 'category',
		point: 4,
		status: 'backlog',
		parentStoryId: 3,
		childStoryId: null,
		projectId: 1,
		sprintId: null,
		assignId: 2,
		links: [
			{
				rel: 'self',
				href: 'https://scrumified-dev-bakend.herokuapp.com/stories/4',
			},
		],
	},
	1: {
		id: 1,
		userStory: 'Achor',
		category: 'category',
		point: 2,
		status: 'backlog',
		parentStoryId: 2,
		childStoryId: 3,
		projectId: 1,
		sprintId: null,
		assignId: 1,
		links: [
			{
				rel: 'self',
				href: 'https://scrumified-dev-bakend.herokuapp.com/stories/1',
			},
		],
	},
	3: {
		id: 3,
		userStory: 'Catine',
		category: 'category',
		point: 2,
		status: 'backlog',
		parentStoryId: 1,
		childStoryId: 4,
		projectId: 1,
		sprintId: null,
		assignId: 1,
		links: [
			{
				rel: 'self',
				href: 'https://scrumified-dev-bakend.herokuapp.com/stories/3',
			},
		],
	},
};

var isEvtSrcOpenedOnce = false;

const Backlog = ({ authToken }) => {
	const { asPath } = useRouter();

	const projectId = asPath.split('/')[2];

	const getParticipants = async () => {
		const response = await fetch(
			`https://scrumified-dev-bakend.herokuapp.com/projects/${projectId}`
		);
		const json = await response.json();
		console.log(json);
		if (json.participants) {
			return [json.owner, ...json.participants];
		} else {
			return [json.owner];
		}
	};

	const getCards = async () => {
		const response = await fetch(
			`https://scrumified-dev-bakend.herokuapp.com/projects/${projectId}/stories?isBacklog=true`,
			{
				method: 'GET',
				mode: 'cors',
			}
		);
		const json = response.json();
		return json;
	};

	const [cards, setCards] = useState({});
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		getCards().then((data) => setCards(data));
		getParticipants().then((data) => setParticipants(data));

		const uri = 'https://scrumified-dev-bakend.herokuapp.com/backlog';
		let eventSource = new EventSource(uri);

		eventSource.onopen = (e) => {
			if (isEvtSrcOpenedOnce) {
				eventSource.close();
			} else {
				console.log('Open Backlog Event Source!');
				isEvtSrcOpenedOnce = true;
			}
		};

		eventSource.addEventListener('Fired', (e) => {
			const newCard = JSON.parse(e.data);
			const newCards = { ...cards };
			newCards[newCard.id] = newCard;
			setCards(newCards);
			console.log(newCards);
		});

		return () => {
			eventSource.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	let bg = useColorModeValue('white', '#405A7D');
	let color = useColorModeValue('#031d46', '#fffdfe');
	let btnBg = useColorModeValue('gray.200', '#fffdfe');
	let btnColor = 'black';
	let bgGradient = useColorModeValue(
		'linear(gray.50 0%, gray.100 100%)',
		'linear(blue.800 0%, blue.900 100%)'
	);

	const linkCards = (s) => {
		let renderCards = [];
		if (Object.keys(cards).length === 0) {
			return renderCards;
		}

		let tmp = null;
		for (let key in cards) {
			if (
				cards.hasOwnProperty(key) &&
				!cards[key].parentStoryId &&
				cards[key].status === s
			) {
				tmp = cards[key];
				break;
			}
		}

		let i = 0;
		while (true) {
			renderCards.push(
				<Card
					key={tmp.id}
					card={tmp}
					index={i++}
					bg={bg}
					color={color}
					btnBg={btnBg}
					btnColor={btnColor}
				/>
			);
			if (!!tmp.childStoryId) tmp = cards[tmp.childStoryId];
			else break;
		}
		return renderCards;
	};

	const cardList = linkCards('backlog');

	const [winReady, setwinReady] = useState(false);

	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<LoggedUserProvider authToken={authToken}>
			<Head>
				<title>Backlog</title>
			</Head>
			<MainContainer>
				<Box>
					<SectionHeader>Backlog</SectionHeader>
					<BacklogController
						cards={cards}
						setCards={setCards}
						bg={bg}
						color={color}
						btnBg={btnBg}
						btnColor={btnColor}
						projectId={projectId}
						participants={participants}
					/>
					{winReady ? (
						<Board
							cards={cards}
							setCards={setCards}
							cardList={cardList}
						>
							<Column
								key={0}
								title={'Stories'}
								id={'backlog'}
								cards={cards}
								setCards={setCards}
								cardList={cardList}
								bg={bg}
								color={color}
								btnBg={btnBg}
								btnColor={btnColor}
								bgGradient={bgGradient}
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
	return {
		props: {
			authToken: auth || '',
		},
	};
}

export default Backlog;
