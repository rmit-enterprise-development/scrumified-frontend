import { AddIcon } from '@chakra-ui/icons';
import {
	Badge,
	Box,
	Circle,
	Flex,
	Heading,
	Text,
	useDisclosure,
	WrapItem,
	Tooltip,
	IconButton,
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const Card = (props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const colorScheme = 'red' + '.500';
	return (
		<Draggable draggableId={'' + props.card.id} index={props.index}>
			{(provided) => (
				<Box
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					onClick={() => {
						onOpen();
					}}
					boxSizing="border-box"
					borderRadius="1rem"
					overflow="hidden"
					bg={'white'}
					mb={4}
					boxShadow="base"
				>
					<Box p={4} bgColor={'white'}>
						<Flex
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Heading fontSize="xl" isTruncated>
								{props.card.userStory}
							</Heading>

							<WrapItem>
								<Tooltip label={'Add to sprint 1'} placement={'left-start'}>
									<IconButton
										isRound={true}
										size={'xs'}
										onClick={() => {
											onOpen();
										}}
										aria-label="Search database"
										icon={<AddIcon />}
									/>
								</Tooltip>
							</WrapItem>
						</Flex>
						<Flex
							mt={4}
							justifyContent="space-between"
							alignItems={'center'}
							alignContent={'center'}
						>
							<Flex alignItems={'center'}>
								<Text paddingRight={2}>Assignees:</Text>
								<Avvvatars value="Minh Pham" size="25" />
							</Flex>
							<Flex alignItems={'center'}>
								<Badge
									colorScheme="green"
									borderRadius={'4px'}
									marginRight={2}
								>
									{props.card.category}
								</Badge>

								<Circle
									size="25px"
									bg={colorScheme}
									color="white"
									p={'10px'}
								>
									{props.card.point}
								</Circle>
							</Flex>
						</Flex>
					</Box>
					<CardModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						// data={data}
						// setData={setData}
						// card={props.card}
					/>
				</Box>
			)}
		</Draggable>
	);
};

export default Card;
