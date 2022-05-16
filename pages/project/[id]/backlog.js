import {
  Box,
  Button,
  Flex,
  Skeleton,
  Tag, useDisclosure
} from "@chakra-ui/react";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import projectAPI from "../../../api/services/projectAPI";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import StaticBoardBacklog from "../../../components/common/StaticBoard/StaticBoardBacklog";
import MainContainer from "../../../components/layout/MainContainer";
import BacklogController from "../../../components/workspace/BacklogController";
import Board from "../../../components/workspace/Board";
import Column from "../../../components/workspace/Column";
import SprintDrawer from "../../../components/workspace/SprintDrawer";
import { SprintColor } from "../../../config/constants";
import linkCards from "../../../utils/card/card";

const Backlog = ({ authToken }) => {
  const { asPath } = useRouter();
  const projectId = asPath.split("/")[2];
  const [cards, setCards] = useState({});
  const [cardList, setCardList] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [winReady, setwinReady] = useState(false);
  // Filtered Card (from Backlog Controller)
  const [filteredCard, setFilteredCard] = useState({
    isFilter: false,
    cardList: [],
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [currentSprint, setCurrentSprint] = useState({});
  const [isSprint, setIsSprint] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const currentTime = new Date(Date.now()).getTime();
  const currentDate = Math.floor(currentTime / 1000);

  const [isPending, setIsPending] = useState(false);

  const getCurrentSprint = async () => {
    setIsLoading(true);
    try {
      const response = await projectAPI.getCurrentSprint(projectId);
      const json = response.data;
      setCurrentSprint(json);
      setIsSprint(
        Object.keys(json).length !== 0 && json.constructor === Object
      );

      const currentTime = new Date(Date.now()).getTime();
      const currentDate = Math.floor(currentTime / 1000);

      setIsPending(currentDate < json.startDate);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

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

  const getCards = async () => {
    setIsLoading(true);
    try {
      const response = await projectAPI.getAllStories(projectId, {
        isBacklog: true,
        returnArray: false,
      });
      const json = response.data;
      setCards(json);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setwinReady(true);
    getParticipants(); // Always get participants first
    getCurrentSprint();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCards();
    getCurrentSprint();

    const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
    let eventSource = new EventSource(uri);
    eventSource.onopen = (e) => {
      console.log("Open Backlog Event Source!");
    };
    eventSource.addEventListener("updateCards", getCards);
    eventSource.addEventListener("updateSprint", getCurrentSprint);
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]); // Always make sure participants available first

  useEffect(() => {
    const tmp = linkCards(
      cards,
      "backlog",
      participants,
      false,
      currentSprint.id
    );
    setCardList(tmp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, currentSprint]);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Backlog</title>
      </Head>
      <MainContainer>
        <Button
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          transition="all 0.15s linear"
          zIndex="500"
          bg="#ee0405"
          h="4rem"
          borderTopRightRadius={0}
          borderBottomRightRadius={0}
          position="absolute"
          top="40%"
          right="0"
          w="3rem"
          opacity={0.8}
          _hover={{ width: "6rem", opacity: 1 }}
          onClick={onOpen}
        >
          <FaChevronLeft size="1rem" color="white" />
        </Button>
        <Box>
          <Flex alignItems="center">
            <SectionHeader>Backlog</SectionHeader>
            <Skeleton isLoaded={!isLoading} ml={3}>
              {!isSprint ? (
                <Tag
                  textAlign="center"
                  variant="outline"
                  size="md"
                  colorScheme={SprintColor.NO_SPRINT}
                >
                  EMPTY SPRINT
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
                  {isPending ? "PENDING SPRINT" : "ACTIVE SPRINT"}
                </Tag>
              )}
            </Skeleton>
          </Flex>
          <BacklogController
            cards={cards}
            setCards={setCards}
            projectId={projectId}
            participants={participants}
            setFilteredCard={setFilteredCard}
            isLoading={isLoading}
          />

          {filteredCard.isFilter ? (
            <StaticBoardBacklog
              storyList={filteredCard.cardList}
              participants={participants}
              sprintId={currentSprint.id}
            />
          ) : winReady ? (
            <Board
              cards={cards}
              setCards={setCards}
              cardList={cardList}
              isBacklog={true}
            >
              <Skeleton isLoaded={!isLoading}>
                <Column
                  key={0}
                  title={"Stories"}
                  id={"backlog"}
                  cards={cards}
                  setCards={setCards}
                  cardList={cardList}
                  columnColor={"gray.500"}
                />
              </Skeleton>
            </Board>
          ) : null}
        </Box>

        <SprintDrawer
          projectId={projectId}
          onClose={onClose}
          isOpen={isOpen}
          currentSprint={currentSprint}
          isSprint={isSprint}
        />
      </MainContainer>
    </LoggedUserProvider>
  );
};

export async function getServerSideProps(ctx) {
  const { auth } = cookies(ctx);
  return {
    props: {
      authToken: auth || "",
    },
  };
}

export default Backlog;
