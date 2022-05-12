import { Box, useColorModeValue } from "@chakra-ui/react";
import cookies from "next-cookies";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import projectAPI from "../../../api/services/projectAPI";
import { LoggedUserProvider } from "../../../components/common/LoggedUserProvider";
import SectionHeader from "../../../components/common/SectionHeader/SectionHeader";
import StaticBoardBacklog from "../../../components/common/StaticBoard/StaticBoardBacklog";
import MainContainer from "../../../components/layout/MainContainer";
import BacklogController from "../../../components/workspace/BacklogController";
import Board from "../../../components/workspace/Board";
import Card from "../../../components/workspace/Card";
import Column from "../../../components/workspace/Column";

const initData = {
  2: {
    id: 2,
    userStory: "Border",
    category: "category",
    point: 4,
    status: "backlog",
    parentStoryId: null,
    childStoryId: 1,
    projectId: 1,
    sprintId: null,
    assignId: 2,
    links: [
      {
        rel: "self",
        href: "https://scrumified-dev-bakend.herokuapp.com/stories/2",
      },
    ],
  },
  4: {
    id: 4,
    userStory: "Dunky",
    category: "category",
    point: 4,
    status: "backlog",
    parentStoryId: 3,
    childStoryId: null,
    projectId: 1,
    sprintId: null,
    assignId: 2,
    links: [
      {
        rel: "self",
        href: "https://scrumified-dev-bakend.herokuapp.com/stories/4",
      },
    ],
  },
  1: {
    id: 1,
    userStory: "Achor",
    category: "category",
    point: 2,
    status: "backlog",
    parentStoryId: 2,
    childStoryId: 3,
    projectId: 1,
    sprintId: null,
    assignId: 1,
    links: [
      {
        rel: "self",
        href: "https://scrumified-dev-bakend.herokuapp.com/stories/1",
      },
    ],
  },
  3: {
    id: 3,
    userStory: "Catine",
    category: "category",
    point: 2,
    status: "backlog",
    parentStoryId: 1,
    childStoryId: 4,
    projectId: 1,
    sprintId: null,
    assignId: 1,
    links: [
      {
        rel: "self",
        href: "https://scrumified-dev-bakend.herokuapp.com/stories/3",
      },
    ],
  },
};

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

	const [cards, setCards] = useState({});
	const [cardList, setCardList] = useState([]);
	const [participants, setParticipants] = useState([]);

	useEffect(() => {
		getCards().then((data) => {
			return setCards(data);
		});
		getParticipants().then((data) => setParticipants(data));

		const handleReceiveCard = (e) => {
			console.log(e.data);
			getCards().then((data) => {
				return setCards(data);
			});
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
  }, []);

  useEffect(() => {
    const linkCards = (data, category) => {
      console.log(data);
      let renderCards = [];
      if (Object.keys(data).length === 0) {
        return renderCards;
      }

      let tmp = null;
      for (let key in data) {
        if (
          cards.hasOwnProperty(key) &&
          !data[key].parentStoryId &&
          data[key].status === category
        ) {
          tmp = data[key];
          break;
        }
      }

			let i = 0;
			while (true) {
				renderCards.push(
					<Card
						key={tmp.id}
						card={tmp}
						index={i++}
						participants={participants}
						bg={bg}
						color={color}
						btnBg={btnBg}
						btnColor={btnColor}
					/>
				);
				if (!!tmp.childStoryId) tmp = data[tmp.childStoryId];
				else break;
			}
			console.log(renderCards);
			return renderCards;
		};
		const tmp = linkCards(cards, 'backlog');
		setCardList(tmp);
	}, [bg, cards, color]);

  const [winReady, setwinReady] = useState(false);

  // Filtered Card (from Backlog Controller)
  const [filteredCard, setFilteredCard] = useState([]);

  useEffect(() => {
    setwinReady(true);
  }, []);

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

          {filteredCard.length > 0 ? (
            <StaticBoardBacklog
              storyList={filteredCard}
              participants={participants}
            />
          ) : winReady ? (
            <Board cards={cards} setCards={setCards} cardList={cardList}>
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
