import { Box, useColorModeValue } from '@chakra-ui/react';
import cookies from 'next-cookies';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import projectAPI from '../../../api/services/projectAPI';
import { LoggedUserProvider } from '../../../components/common/LoggedUserProvider';
import SectionHeader from '../../../components/common/SectionHeader/SectionHeader';
import StaticBoardBacklog from '../../../components/common/StaticBoard/StaticBoardBacklog';
import MainContainer from '../../../components/layout/MainContainer';
import BacklogController from '../../../components/workspace/BacklogController';
import Board from '../../../components/workspace/Board';
import Column from '../../../components/workspace/Column';
import linkCards from '../../../utils/card/card';

const Backlog = ({ authToken }) => {
	const { asPath } = useRouter();

	const projectId = asPath.split('/')[2];

	const getParticipants = async () => {
		try {
			const response = await projectAPI.getProject(projectId);
			const json = response.data;
			if (json.participants) {
				setParticipants([json.owner, ...json.participants]);
			} else {
				setParticipants([json.owner]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getCards = async () => {
		try {
			const response = await projectAPI.getAllStories(projectId, {
				isBacklog: true,
				returnArray: false,
			});
			const json = response.data;
			setCards(json);
		} catch (error) {
			console.log(error);
		}
	};

	const [cards, setCards] = useState({});
	const [cardList, setCardList] = useState([]);
	const [participants, setParticipants] = useState([]);

	const [winReady, setwinReady] = useState(false);
	// Filtered Card (from Backlog Controller)
	const [filteredCard, setFilteredCard] = useState({
		isFilter: false,
		cardList: [],
	});

	useEffect(() => {
		setwinReady(true);
		getParticipants(); // Always get participants first
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		getCards();

		const handleReceiveCard = (e) => {
			getCards();
		};

		const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
		let eventSource = new EventSource(uri);
		eventSource.onopen = (e) => {
			console.log('Open Backlog Event Source!');
		};
		eventSource.addEventListener('update', handleReceiveCard);
		return () => {
			eventSource.close();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [participants]); // Always make sure participants available first

	useEffect(() => {
		const tmp = linkCards(cards, 'backlog', participants);
		setCardList(tmp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [cards]);

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
						projectId={projectId}
						participants={participants}
						setFilteredCard={setFilteredCard}
					/>

					{filteredCard.isFilter ? (
						<StaticBoardBacklog
							storyList={filteredCard.cardList}
							participants={participants}
						/>
					) : winReady ? (
						<Board
							cards={cards}
							setCards={setCards}
							cardList={cardList}
							isBacklog={true}
						>
							<Column
								key={0}
								title={'Stories'}
								id={'backlog'}
								cards={cards}
								setCards={setCards}
								cardList={cardList}
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
