import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = () => {
  const randomColor = [
    "green",
    "yellow",
    "blue",
    "purple",
    "orange",
    "pink",
    "brown",
  ];

  const data = [
    {
      id: "1",
      name: "Sample Project 1",
      author: "Thach Ho",
      createdTime: "4/3/2022",
      color: randomColor[1],
      openTasks: "2",
    },
    {
      id: "2",
      name: "Dit con me project nay ten dai vai ca lon luon",
      author: "Minh Pham",
      createdTime: "12/3/2022",
      color: randomColor[2],
      openTasks: "2",
    },
    {
      id: "3",
      name: "Sample Project 3",
      author: "Duong Nguyen",
      createdTime: "14/3/2022",
      color: randomColor[3],
      openTasks: "2",
    },
    {
      id: "4",
      name: "Sample Project 4",
      author: "Khang Nguyen",
      createdTime: "24/3/2022",
      color: randomColor[4],
      openTasks: "2",
    },
  ];
  return (
    <Flex flexWrap="wrap" gap={5}>
      <ProjectItem {...data[0]} />
      <ProjectItem {...data[1]} />
      <ProjectItem {...data[2]} />
      <ProjectItem {...data[3]} />
    </Flex>
  );
};

export default ProjectGrid;
