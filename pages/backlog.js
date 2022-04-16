import { Box } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
// import Board from "../components/backlog/Board";
import SectionHeader from '../components/dashboard/SectionHeader';
import Sidebar from '../components/dashboard/SideBar/Sidebar.tsx';
import Board from '../components/workspace/Board';
import Column from '../components/workspace/Column';

const Backlog = () => {
	const [backlog, setBacklog] = useState({
		backlog: [
			{
				id: '1',
				story: 'I am on top of the world',
				category: 'Hello',
				point: '12',
			},
			{
				id: '2',
				story: 'I am on top of the world',
				category: 'Hello',
				point: '12',
			},
			{
				id: '3',
				story: 'I am on top of the world',
				category: 'Hello',
				point: '12',
			},
		],
	});

	const [winReady, setwinReady] = useState(false);
	useEffect(() => {
		setwinReady(true);
	}, []);

	return (
		<Box display="flex">
			<Box>
				<Sidebar />
			</Box>
			<Box m={10} w="100%">
				<Box>
					<SectionHeader>Backlog</SectionHeader>
					{winReady ? (
						<Board backlog={backlog} setBacklog={setBacklog}>
							<Column
								title={'Backlog'}
								id={backlog.backlog.id}
								cards={backlog.backlog}
							/>
						</Board>
					) : null}
				</Box>
			</Box>
		</Box>
	);
};

export default Backlog;
