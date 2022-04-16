import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import SectionHeader from '../components/dashboard/SectionHeader';
import Sidebar from '../components/dashboard/SideBar/Sidebar.tsx';
import Board from '../components/workspace/Board';
import Column from '../components/workspace/Column';

const Sprint = () => {
	// const initData = {
	// 	cards: {
	// 		1: { id: '1', story: 'card1', category: 'abc', point: '1' },
	// 		2: { id: '2', story: 'card2', category: 'abc', point: '1' },
	// 		3: { id: '3', story: 'card3', category: 'abc', point: '1' },
	// 	},

	// 	columns: {
	// 		todo: { id: 'todo', title: 'todo', order: ['1', '2', '3'] },
	// 	},

	// 	columnOrder: ['todo'],
	// };

	const initData = [
		{
			id: '1',
			story: 'Card1',
			category: 'Hello',
			point: '12',
			position: 2,
			status: 'todo',
		},
		{
			id: '2',
			story: 'Card2',
			category: 'Hello',
			point: '12',
			position: 0,
			status: 'inProgress',
		},
		{
			id: '3',
			story: 'Card3',
			category: 'Hello',
			point: '12',
			position: 0,
			status: 'done',
		},
		{
			id: '4',
			story: 'Card4',
			category: 'Hello',
			point: '12',
			position: 1,
			status: 'todo',
		},
		{
			id: '5',
			story: 'Card5',
			category: 'Hello',
			point: '12',
			position: 1,
			status: 'inProgress',
		},
		{
			id: '6',
			story: 'Card6',
			category: 'Hello',
			point: '12',
			position: 0,
			status: 'todo',
		},
	];

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
		<Box display="flex">
			<Box>
				<Sidebar />
			</Box>
			<Box m={10} w="100%">
				<Box>
					<SectionHeader>Active Sprint</SectionHeader>
					{winReady ? (
						<Board data={data} setData={setData}>
							<Column
								key={0}
								title={'todo'}
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
								title={'done'}
								id={'done'}
								cards={filterCards('done')}
							/>
						</Board>
					) : null}
				</Box>
			</Box>
		</Box>
	);
};

export default Sprint;
