import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import SectionHeader from '../../../components/common/SectionHeader/SectionHeader';
import MainContainer from '../../../components/layout/MainContainer';
import Board from '../../../components/workspace/Board';
import Column from '../../../components/workspace/Column';

import { Box, Flex, Skeleton, Tag } from '@chakra-ui/react';
import cookies from 'next-cookies';
import projectAPI from '../../../api/services/projectAPI';
import { LoggedUserProvider } from '../../../components/common/LoggedUserProvider';
import SprintController from '../../../components/workspace/SprintController';
import linkCards from '../../../utils/card/card';
import { SprintColor } from '../../../config/constants';
import sprintAPI from '../../../api/services/sprintAPI';

const initData = {
  9: {
    id: 9,
    userStory: 'A',
    category: 'category',
    createdDate: 1652268620,
    point: 4,
    defOfDone: 'abc',
    status: 'todo',
    parentStoryId: null,
    childStoryId: 11,
    projectId: 2,
    sprintId: 4,
    assignId: 2,
    links: [
      {
        rel: 'self',
        href: 'http://127.0.0.1:8989/stories/9',
      },
    ],
  },
  11: {
    id: 11,
    userStory: 'B',
    category: 'category',
    createdDate: 1652282290,
    point: 4,
    defOfDone: 'abc',
    status: 'todo',
    parentStoryId: 9,
    childStoryId: null,
    projectId: 2,
    sprintId: 4,
    assignId: 2,
    links: [
      {
        rel: 'self',
        href: 'http://127.0.0.1:8989/stories/11',
      },
    ],
  },
  8: {
    id: 8,
    userStory: 'C',
    category: 'category',
    createdDate: 1652171796,
    point: 4,
    defOfDone: null,
    status: 'inProgress',
    parentStoryId: null,
    childStoryId: 10,
    projectId: 2,
    sprintId: 4,
    assignId: 2,
    links: [
      {
        rel: 'self',
        href: 'http://127.0.0.1:8989/stories/8',
      },
    ],
  },
  10: {
    id: 10,
    userStory: 'D',
    category: 'category',
    createdDate: 1652282226,
    point: 4,
    defOfDone: 'abc',
    status: 'inProgress',
    parentStoryId: 8,
    childStoryId: null,
    projectId: 2,
    sprintId: 4,
    assignId: 2,
    links: [
      {
        rel: 'self',
        href: 'http://127.0.0.1:8989/stories/10',
      },
    ],
  },
  12: {
    id: 12,
    userStory: 'E',
    category: 'category',
    createdDate: 1652282434,
    point: 4,
    defOfDone: 'abc',
    status: 'done',
    parentStoryId: null,
    childStoryId: null,
    projectId: 2,
    sprintId: 4,
    assignId: 2,
    links: [
      {
        rel: 'self',
        href: 'http://127.0.0.1:8989/stories/12',
      },
    ],
  },
};

const Sprint = ({ authToken }) => {
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
  const [cardListTodo, setCardListTodo] = useState([]);
  const [cardListinProgress, setcardListinProgress] = useState([]);
  const [cardListDone, setCardListDone] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentSprint, setCurrentSprint] = useState({});
  const [isSprint, setIsSprint] = useState(false);
  const currentTime = new Date(Date.now()).getTime();
  const currentDate = Math.floor(currentTime / 1000);
  const isPending = currentDate < currentSprint.startDate;

  const getCurrentSprint = async () => {
    try {
      const response = await projectAPI.getCurrentSprint(projectId);
      const json = response.data;
      setCurrentSprint(json);
      setIsSprint(
        Object.keys(json).length !== 0 && json.constructor === Object
      );

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getStories = async () => {
    try {
      const response = await sprintAPI.getAllStories(2);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const participants = [
      {
        id: 2,
        firstName: 'Uncle',
        lastName: 'HoHo',
        email: 'abc@gmail.com',
        description: null,
      },
    ];
    setCardListTodo(
      linkCards(
        cards,
        'todo',
        [
          {
            id: 2,
            firstName: 'Uncle',
            lastName: 'HoHo',
            email: 'abc@gmail.com',
            description: null,
          },
        ],
        true
      )
    );
    setcardListinProgress(
      linkCards(
        cards,
        'inProgress',
        [
          {
            id: 2,
            firstName: 'Uncle',
            lastName: 'HoHo',
            email: 'abc@gmail.com',
            description: null,
          },
        ],
        true
      )
    );
    setCardListDone(
      linkCards(
        cards,
        'done',
        [
          {
            id: 2,
            firstName: 'Uncle',
            lastName: 'HoHo',
            email: 'abc@gmail.com',
            description: null,
          },
        ],
        true
      )
    );
    // }, [bg, cards, color]);
  }, [cards]);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
    getCurrentSprint();
    getStories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Active Sprint</title>
      </Head>

      <MainContainer>
        <Box>
          <Flex alignItems="center">
            <SectionHeader>Sprint</SectionHeader>
            <Skeleton isLoaded={!isLoading} ml={3}>
              {!isSprint ? (
                <Tag
                  textAlign="center"
                  variant="outline"
                  size="md"
                  colorScheme={SprintColor.NO_SPRINT}
                >
                  EMPTY
                </Tag>
              ) : (
                <Tag
                  textAlign="center"
                  variant="outline"
                  size="md"
                  colorScheme={
                    isPending
                      ? SprintColor.PENDING_SPRINT
                      : SprintColor.ACTIVE_SPRINT
                  }
                >
                  {isPending ? 'NOT STARTED' : 'ACTIVE'}
                </Tag>
              )}
            </Skeleton>
          </Flex>
          <SprintController
            isSprint={isSprint}
            isPending={isPending}
            isLoading={isLoading}
          />
          {winReady ? (
            <Board
              cards={cards}
              setCards={setCards}
              cardList={{
                todo: cardListTodo,
                inProgress: cardListinProgress,
                done: cardListDone,
              }}
              templateColumns="repeat(3, 1fr)"
            >
              <Column
                key={0}
                title={'Todo'}
                id={'todo'}
                cards={cards}
                setCards={setCards}
                cardList={cardListTodo}
                columnColor={'red.500'}
              />
              <Column
                key={1}
                title={'In Progress'}
                id={'inProgress'}
                cards={cards}
                setCards={setCards}
                cardList={cardListinProgress}
                columnColor={'blue.500'}
              />
              <Column
                key={2}
                title={'Done'}
                id={'done'}
                cards={cards}
                setCards={setCards}
                cardList={cardListDone}
                columnColor={'green.500'}
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
