import React from 'react';
import { Box } from '@chakra-ui/react';
import ProjectGrid from '../components/dashboard/ProjectGrid';
import SectionHeader from '../components/dashboard/SectionHeader';
import Sidebar from '../components/dashboard/Sidebar/SideBar';

import Board from '../components/backlog/Board';

const Backlog = () => {
	return (
		<Box display="flex">
			<Box>
				<Sidebar />
			</Box>
			<Box m={10} w="100%">
				<Box>
					<SectionHeader>Backlog</SectionHeader>
					<Board/>
				</Box>
			</Box>
		</Box>
	);
};

export default Backlog;
