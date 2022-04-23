import { SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = ({ data }) => {
  const randomColor = [
    "green",
    "yellow",
    "blue",
    "purple",
    "orange",
    "pink",
    "brown",
  ];

  const dataMock = [
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
      name: "Sample Project 3",
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
    <SimpleGrid columns={[1, 2, 4]} gap={5} py={2}>
      <ProjectItem {...dataMock[0]} />
      <ProjectItem {...dataMock[1]} />
      <ProjectItem {...dataMock[2]} />
      <ProjectItem {...dataMock[3]} />
    </SimpleGrid>
  );
};

export default ProjectGrid;
