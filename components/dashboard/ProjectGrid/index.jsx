import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";

const ProjectGrid = () => {
  const randomColor = ["tomato", "grey", "gold", "teal", "deepskyblue"];

  const data = [
    {
      id: "id1",
      name: "Sample Project 1",
      author: "Owned by: ",
      createdTime: "Created at: ",
      color: "deepskyblue",
    },
    {
      id: "id2",
      name: "Sample Project 2",
      author: "Owned by: ",
      createdTime: "Created at: ",
      color: "deepskyblue",
    },
    {
      id: "id3 ",
      name: "Sample Project 3",
      author: "Owned by: ",
      createdTime: "Created at: ",
      color: "deepskyblue",
    },
    {
      id: "id4",
      name: "Sample Project 4",
      author: "Owned by: ",
      createdTime: "Created at: ",
      color: "deepskyblue",
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
