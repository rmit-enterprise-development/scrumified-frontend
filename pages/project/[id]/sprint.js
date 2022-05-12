import Head from 'next/head';
import { useEffect, useState } from 'react';
import SectionHeader from '../../../components/common/SectionHeader/SectionHeader';
import MainContainer from '../../../components/layout/MainContainer';
import Board from '../../../components/workspace/Board';
import Column from '../../../components/workspace/Column';

import cookies from 'next-cookies';
import { LoggedUserProvider } from '../../../components/common/LoggedUserProvider';
import { useColorModeValue } from '@chakra-ui/react';

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

	const [data, setData] = useState(initData);

	const [winReady, setwinReady] = useState(false);
	useEffect(() => {
		setwinReady(true);
	}, []);

	const filterCards = (s) => {
		const cards = data.filter((card) => card.status === s);
		cards = cards.sort((a, b) => a.position - b.position);
		return cards;
	};

	return (
		<LoggedUserProvider authToken={authToken}>
			<Head>
				<title>Active Sprint</title>
			</Head>

			<MainContainer>
				<SectionHeader>Active Sprint</SectionHeader>
				{winReady ? (
					<Board
						data={data}
						setData={setData}
						templateColumns="repeat(3, 1fr)"
					>
						<Column
							key={0}
							title={'Todo'}
							id={'todo'}
							cards={filterCards('todo')}
						/>
						<Column
							key={1}
							title={'In Progress'}
							id={'inProgress'}
							cards={filterCards('inProgress')}
						/>
						<Column
							key={2}
							title={'Done'}
							id={'done'}
							cards={filterCards('done')}
						/>
					</Board>
				) : null}
			</MainContainer>
		</LoggedUserProvider>
	);
};

export async function getServerSideProps(ctx) {
	const { auth } = cookies(ctx);
	return { props: { authToken: auth || '' } };
}

export default Sprint;
