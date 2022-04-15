import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = () => {
  const randomColor = ["tomato", "grey", "gold", "teal", "deepskyblue"];

  const data = [
    {
      id: "id1",
      name: "Sample Project 1",
      author: "Thach Ho",
      createdTime: "4/3/2022",
      color: "red",
      openTasks: "2",
    },
    {
      id: "id2",
      name: "Dit con me project nay ten dai vai ca lon luon",
      author: "Minh Pham",
      createdTime: "12/3/2022",
      color: "yellow",
      openTasks: "2",
    },
    {
      id: "id3 ",
      name: "Sample Project 3",
      author: "Duong Nguyen",
      createdTime: "14/3/2022",
      color: "blue",
      openTasks: "2",
    },
    {
      id: "id4",
      name: "Sample Project 4",
      author: "Khang Nguyen",
      createdTime: "24/3/2022",
      color: "purple",
      openTasks: "2",
    },
  ];
  return (
    <SimpleGrid columns={[1, 2, 4]} gap={5} p={5}>
      <ProjectItem {...data[0]} />
      <ProjectItem {...data[1]} />
      <ProjectItem {...data[2]} />
      <ProjectItem {...data[3]} />
    </SimpleGrid>
  );
};

export default ProjectGrid;
