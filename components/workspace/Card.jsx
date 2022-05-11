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
} from '@chakra-ui/react';
import Avvvatars from 'avvvatars-react';
import { Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

const Card = ({ participants, bg, color, btnColor, btnBg, card, ...props }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const colorScheme = 'red' + '.500';
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
