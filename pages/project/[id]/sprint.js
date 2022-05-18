import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import MainContainer from "../../../components/layout/MainContainer";
import Board from "../../../components/workspace/Board";
import Column from "../../../components/workspace/Column";

import { Box, Flex, Skeleton, Tag } from "@chakra-ui/react";
import cookies from "next-cookies";
import projectAPI from "../../../api/services/projectAPI";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import SprintController from "../../../components/workspace/SprintController";
import linkCards from "../../../utils/card/card";
import { SprintColor } from "../../../config/constants";
import sprintAPI from "../../../api/services/sprintAPI";
import calculatePointsAllColumn from "../../../utils/card/point";

const Sprint = ({ authToken }) => {
  const { asPath } = useRouter();

  const projectId = asPath.split("/")[2];
  const [cards, setCards] = useState([]);
  const [cardListTodo, setCardListTodo] = useState([]);
  const [cardListInProgress, setCardListInProgress] = useState([]);
  const [cardListDone, setCardListDone] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [currentSprint, setCurrentSprint] = useState({});
  const [isSprint, setIsSprint] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const getParticipants = async () => {
    setIsLoading(true);
    try {
      const response = await projectAPI.getProject(projectId);
      const json = response.data;
      if (json.participants) {
        setParticipants([json.owner, ...json.participants]);
      } else {
        setParticipants([json.owner]);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentSprint = async () => {
    setIsLoading(true);
    try {
      const response = await projectAPI.getCurrentSprint(projectId);
      const json = response.data;
      setCurrentSprint(json);
      setIsSprint(
        Object.keys(json).length !== 0 && json.constructor === Object
      );

      // Tear down
      if (json) {
        setIsActive(json.status === "inProgress");
        const responseStories = await sprintAPI.getAllStories(json.id);
        setCards(responseStories.data);
      } else {
        setCards([]);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const points = calculatePointsAllColumn(cards);

  const [winReady, setWinReady] = useState(false);
  useEffect(() => {
    setWinReady(true);
    getParticipants();
    getCurrentSprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
    let eventSource = new EventSource(uri);
    eventSource.onopen = (e) => {
      console.log("Open Event Source!");
    };
    eventSource.addEventListener("update", getCurrentSprint);
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]); // Always make sure participants available first

  useEffect(() => {
    setCardListTodo(
      linkCards(cards, "todo", participants, true, currentSprint.id, isActive)
    );
    setCardListInProgress(
      linkCards(
        cards,
        "inProgress",
        participants,
        true,
        currentSprint.id,
        isActive
      )
    );
    setCardListDone(
      linkCards(cards, "done", participants, true, currentSprint.id, isActive)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, currentSprint]);

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
                    isActive
                      ? SprintColor.ACTIVE_SPRINT
                      : SprintColor.PENDING_SPRINT
                  }
                >
                  {isActive ? "ACTIVE" : "NOT STARTED"}
                </Tag>
              )}
            </Skeleton>
          </Flex>
          <SprintController
            sprintId={currentSprint.id}
            isSprint={isSprint}
            isActive={isActive}
            points={points}
            getCurrentSprint={getCurrentSprint}
            setCards={setCards}
          />
          {winReady ? (
            <Board
              cards={cards}
              setCards={setCards}
              cardList={{
                todo: cardListTodo,
                inProgress: cardListInProgress,
                done: cardListDone,
              }}
              templateColumns="repeat(3, 1fr)"
            >
              <Column
                key={0}
                title={"Todo"}
                id={"todo"}
                cards={cards}
                setCards={setCards}
                cardList={cardListTodo}
                columnColor={"red.500"}
                isLoading={isLoading}
                sprintStatus={currentSprint.status}
                isDragDisabled={false}
              />
              <Column
                key={1}
                title={"In Progress"}
                id={"inProgress"}
                cards={cards}
                setCards={setCards}
                cardList={cardListInProgress}
                columnColor={"blue.500"}
                isLoading={isLoading}
                sprintStatus={currentSprint.status}
                isDragDisabled={!isSprint || !isActive}
              />
              <Column
                key={2}
                title={"Done"}
                id={"done"}
                cards={cards}
                setCards={setCards}
                cardList={cardListDone}
                columnColor={"green.500"}
                isLoading={isLoading}
                sprintStatus={currentSprint.status}
                isDragDisabled={!isSprint || !isActive}
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
  return { props: { authToken: auth || "" } };
}

export default Sprint;
