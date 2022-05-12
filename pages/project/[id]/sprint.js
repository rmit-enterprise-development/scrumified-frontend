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

const initData = [];

const Sprint = ({ authToken }) => {
	let bg = useColorModeValue('white', '#405A7D');
	let color = useColorModeValue('#031d46', '#fffdfe');
	let btnBg = useColorModeValue('gray.200', '#fffdfe');
	let btnColor = 'black';
	let bgGradient = useColorModeValue(
		'linear(gray.50 0%, gray.100 100%)',
		'linear(blue.800 0%, blue.900 100%)'
	);

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

	useEffect(() => {
		getCards().then((data) => {
			cardsRef.current = data;
			return setCards(data);
		});
		getParticipants().then((data) => setParticipants(data));

		const handleReceiveCard = (e) => {
			console.log(e.data);
			getCards().then((data) => {
				cardsRef.current = data;
				return setCards(data);
			});
		};

		const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
		let eventSource = new EventSource(uri);
		eventSource.onopen = (e) => {
			if (isEvtSrcOpenedOnce) {
				// eventSource.close();
			} else {
				isEvtSrcOpenedOnce = true;
			}
			console.log('Open Backlog Event Source!');
		};
		eventSource.onmessage = (e) => {
			console.log('on message', e.data);
		};
		eventSource.addEventListener('update', handleReceiveCard);
		return () => {
			eventSource.close();
		};
	}, []);

	useEffect(() => {
		const linkCards = (data, category) => {
			console.log(data);
			let renderCards = [];
			if (Object.keys(data).length === 0) {
				return renderCards;
			}

			let tmp = null;
			for (let key in data) {
				if (
					cards.hasOwnProperty(key) &&
					!data[key].parentStoryId &&
					data[key].status === category
				) {
					tmp = data[key];
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
						participants={participants}
						bg={bg}
						color={color}
						btnBg={btnBg}
						btnColor={btnColor}
					/>
				);
				if (!!tmp.childStoryId) tmp = data[tmp.childStoryId];
				else break;
			}
			console.log(renderCards);
			return renderCards;
		};
		console.log('cardList', cardsRef.current);
		const tmp = linkCards(cardsRef.current, 'backlog');
		setCardList(tmp);
	}, [bg, cards, color]);

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
							cardList={cardList}
							templateColumns="repeat(3, 1fr)"
						>
							<Column
								key={0}
								title={'Todo'}
								id={'todo'}
								cards={cards}
								setCards={setCards}
								cardList={cardList}
								bg={bg}
								color={color}
								btnBg={btnBg}
								btnColor={btnColor}
								bgGradient={bgGradient}
							/>
							<Column
								key={1}
								title={'In Progress'}
								id={'inProgress'}
								cards={cards}
								setCards={setCards}
								cardList={cardList}
								bg={bg}
								color={color}
								btnBg={btnBg}
								btnColor={btnColor}
								bgGradient={bgGradient}
							/>
							<Column
								key={2}
								title={'Done'}
								id={'done'}
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
	return { props: { authToken: auth || '' } };
}

export default Sprint;
