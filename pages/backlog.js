import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import SectionHeader from "../components/dashboard/SectionHeader/SectionHeader";
import Sidebar from "../components/dashboard/SideBar/SideBar";
import BacklogController from "../components/workspace/BacklogController";
import Board from "../components/workspace/Board";
import Column from "../components/workspace/Column";

const Backlog = ({ cards }) => {
  // const initData = [
  // 	{
  // 		id: '1',
  // 		userStory: 'Card1',
  // 		category: 'Hello',
  // 		point: '12',
  // 		position: 2,
  // 		status: 'backlog',
  // 	},
  // 	{
  // 		id: '2',
  // 		userStory: 'Card2',
  // 		category: 'Hello',
  // 		point: '12',
  // 		position: 0,
  // 		status: 'backlog',
  // 	},
  // 	{
  // 		id: '3',
  // 		userStory: 'Card3',
  // 		category: 'Hello',
  // 		point: '12',
  // 		position: 1,
  // 		status: 'backlog',
  // 	},
  // ];

  const [data, setData] = useState(cards);

  const filterCards = (s) => {
    const cards = data.filter((card) => card.status === s);
    cards = cards.sort((a, b) => a.position - b.position);
    return cards;
  };

  console.log(data);
  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  console.log(data);

  return (
    <Box display="flex">
      <Box>
        <Sidebar />
      </Box>
      <Box m={10} flexGrow="1">
        <Box>
          <SectionHeader>Backlog</SectionHeader>
          <BacklogController data={data} setData={setData} />
          {winReady ? (
            <Board data={data} setData={setData}>
              <Column
                key={0}
                title={"Backlog"}
                id={"backlog"}
                cards={filterCards("backlog")}
              />
            </Board>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default Backlog;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8989/projects/1/stories");
  const cards = await res.json();
  if (cards["_embedded"]) {
    return {
      props: {
        cards: cards["_embedded"].storyDtoList,
      },
      revalidate: 5,
    };
  }
  return {
    props: {
      cards: [],
    },
    revalidate: 5,
  };
}
