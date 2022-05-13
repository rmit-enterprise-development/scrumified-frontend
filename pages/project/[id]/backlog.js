import { Box, useColorModeValue } from "@chakra-ui/react";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import projectAPI from "../../../api/services/projectAPI";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import StaticBoardBacklog from "../../../components/common/StaticBoard/StaticBoardBacklog";
import MainContainer from "../../../components/layout/MainContainer";
import BacklogController from "../../../components/workspace/BacklogController";
import Board from "../../../components/workspace/Board";
import Card from "../../../components/workspace/Card";
import Column from "../../../components/workspace/Column";
import linkCards from "../../../utils/card/card";

var isEvtSrcOpenedOnce = false;

const Backlog = ({ authToken }) => {
  let bg = useColorModeValue("white", "#405A7D");
  let color = useColorModeValue("#031d46", "#fffdfe");
  let btnBg = useColorModeValue("gray.200", "#fffdfe");
  let btnColor = "black";
  let bgGradient = useColorModeValue(
    "linear(gray.50 0%, gray.100 100%)",
    "linear(blue.800 0%, blue.900 100%)"
  );

  const { asPath } = useRouter();

  const projectId = asPath.split("/")[2];

  const getParticipants = async () => {
    try {
      const response = await projectAPI.getProject(projectId);
      const json = response.data;
      if (json.participants) {
        setParticipants([json.owner, ...json.participants]);
      } else {
        setParticipants([json.owner]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCards = async () => {
    try {
      const response = await projectAPI.getAllStories(projectId, {
			isBacklog: true,
			returnArray: false,
		});
      const json = response.data;
      console.log("json: ", json);
      setCards(json);
    } catch (error) {
      console.log(error);
    }
  };

  const [cards, setCards] = useState({});
  const [cardList, setCardList] = useState([]);
  const [participants, setParticipants] = useState([]);

  const [winReady, setwinReady] = useState(false);
  // Filtered Card (from Backlog Controller)
  const [filteredCard, setFilteredCard] = useState({
    isFilter: false,
    cardList: [],
  });

  useEffect(() => {
    setwinReady(true);
    getParticipants(); // Always get participants first
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getCards();

    const handleReceiveCard = (e) => {
      getCards();
    };

    const uri = `https://scrumified-dev-bakend.herokuapp.com/backlog?projectId=${projectId}`;
    let eventSource = new EventSource(uri);
    eventSource.onopen = (e) => {
      if (isEvtSrcOpenedOnce) {
        // eventSource.close();
      } else {
        isEvtSrcOpenedOnce = true;
      }
      console.log("Open Backlog Event Source!");
    };
    eventSource.onmessage = (e) => {
      console.log("on message", e.data);
    };
    eventSource.addEventListener("update", handleReceiveCard);
    return () => {
      eventSource.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]); // Always make sure participants available first

  useEffect(() => {
    const tmp = linkCards(cards, "backlog", participants);
    setCardList(tmp);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return (
    <LoggedUserProvider authToken={authToken}>
      <Head>
        <title>Backlog</title>
      </Head>
      <MainContainer>
        <Box>
          <SectionHeader>Backlog</SectionHeader>
          <BacklogController
            cards={cards}
            setCards={setCards}
            bg={bg}
            color={color}
            btnBg={btnBg}
            btnColor={btnColor}
            projectId={projectId}
            participants={participants}
            setFilteredCard={setFilteredCard}
          />

          {filteredCard.isFilter ? (
            <StaticBoardBacklog
              storyList={filteredCard.cardList}
              participants={participants}
            />
          ) : winReady ? (
            <Board
              cards={cards}
              setCards={setCards}
              cardList={cardList}
              isBacklog={true}
            >
              <Column
                key={0}
                title={"Stories"}
                id={"backlog"}
                cards={cards}
                setCards={setCards}
                cardList={cardList}
                bg={bg}
                color={color}
                btnBg={btnBg}
                btnColor={btnColor}
                bgGradient={bgGradient}
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
  return {
    props: {
      authToken: auth || "",
    },
  };
}

export default Backlog;
