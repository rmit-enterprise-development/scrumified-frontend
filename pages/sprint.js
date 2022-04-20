import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import SectionHeader from "../components/common/SectionHeader/SectionHeader";
import MainContainer from "../components/layout/MainContainer";
import Board from "../components/workspace/Board";
import Column from "../components/workspace/Column";

const Sprint = () => {
  const initData = [
    {
      id: "1",
      userStory: "Card1",
      category: "Hello",
      point: "12",
      position: 2,
      status: "todo",
    },
    {
      id: "2",
      userStory: "Card2",
      category: "Hello",
      point: "12",
      position: 0,
      status: "inProgress",
    },
    {
      id: "3",
      userStory: "Card3",
      category: "Hello",
      point: "12",
      position: 0,
      status: "done",
    },
    {
      id: "4",
      userStory: "Card4",
      category: "Hello",
      point: "12",
      position: 1,
      status: "todo",
    },
    {
      id: "5",
      userStory: "Card5",
      category: "Hello",
      point: "12",
      position: 1,
      status: "inProgress",
    },
    {
      id: "6",
      userStory: "Card6",
      category: "Hello",
      point: "12",
      position: 0,
      status: "todo",
    },
  ];

  const [data, setData] = useState(initData);

  const [winReady, setwinReady] = useState(false);
  useEffect(() => {
    setwinReady(true);
  }, []);

  const filterCards = (s) => {
    const cards = data.filter((card) => card.status === s);
    cards = cards.sort((a, b) => a.position - b.position);
    return cards;
  };

  return (
    <>
      <Head>
        <title>Active Sprint</title>
      </Head>

      <MainContainer>
        <Box>
          <SectionHeader>Active Sprint</SectionHeader>
          {winReady ? (
            <Board data={data} setData={setData}>
              <Column
                key={0}
                title={"todo"}
                id={"todo"}
                cards={filterCards("todo")}
              />
              <Column
                key={1}
                title={"In Progress"}
                id={"inProgress"}
                cards={filterCards("inProgress")}
              />
              <Column
                key={2}
                title={"done"}
                id={"done"}
                cards={filterCards("done")}
              />
            </Board>
          ) : null}
        </Box>
      </MainContainer>
    </>
  );
};

export default Sprint;
