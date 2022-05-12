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
	useColorModeValue,
	Tag,
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const Card = ({ participants, bg, color, btnColor, btnBg, card, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const colorScheme = 'red' + '.500';

	const getUserInfoValue = (id) => {
		const user = participants.find((p) => p.id === id);
		return user.firstName + ' ' + user.lastName + ' (' + user.email + ')';
	};
	return (
		<Draggable draggableId={'' + card.id} index={props.index}>
			{(provided) => (
				<>
					<Box
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						onClick={(e) => {
							onOpen();
						}}
						boxSizing="border-box"
						borderRadius="1rem"
						overflow="hidden"
						bg={bg}
						color={color}
						mb={4}
						p={4}
						boxShadow="base"
					>
						<Flex
							alignItems={'center'}
							justifyContent={'space-between'}
						>
							<Heading fontSize="xl" isTruncated>
								{card.userStory}
							</Heading>

							<WrapItem>
								<Tooltip
									label={'Add to sprint 1'}
									placement={'left-start'}
								>
									<IconButton
										isRound={true}
										size={'xs'}
										bgColor={btnBg}
										_hover={{ opacity: 0.8 }}
										onClick={(e) => {
											e.stopPropagation();
											console.log('DitMe');
										}}
										aria-label="Search database"
										icon={<AddIcon color={btnColor} />}
									/>
								</Tooltip>
							</WrapItem>
						</Flex>
						<Flex
							mt={3}
							justifyContent="space-between"
							alignItems={'center'}
							alignContent={'center'}
						>
							<Flex alignItems={'center'}>
								<Text paddingRight={2}>Assignees:</Text>
								<WrapItem>
									<Tooltip
										label={getUserInfoValue(card.assignId)}
										placement={'right-start'}
									>
										<Tag rounded={'full'} size={'xs'}>
											<Avvvatars
												value={getUserInfoValue(
													card.assignId
												)}
												size="25"
											/>
										</Tag>
									</Tooltip>
								</WrapItem>
							</Flex>
							<Flex alignItems={'center'}>
								<Badge
									colorScheme="green"
									borderRadius={'4px'}
									marginRight={2}
								>
									{card.category}
								</Badge>

								<Circle
									size="25px"
									bg={colorScheme}
									color="white"
									p={'10px'}
								>
									{card.point}
								</Circle>
							</Flex>
						</Flex>
					</Box>
					<CardModal
						isOpen={isOpen}
						onOpen={onOpen}
						onClose={onClose}
						prevCard={card}
						participants={participants}
						isCard={true}
					/>
				</>
			)}
		</Draggable>
	);
};

export default Card;
