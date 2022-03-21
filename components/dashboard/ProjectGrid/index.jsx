import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";

const ProjectGrid = () => {
  const randomColor = ["tomato", "grey", "gold", "teal", "deepskyblue"];

  const data = {
    name: "Sample Project",
    author: "Owned by: ",
    createdTime: "Created at: ",
    color: "deepskyblue",
  };
  return (
    <SimpleGrid columns={[1, 2, 4]} gap={5} p={5}>
      <ProjectItem {...data} />
      <ProjectItem {...data} />
      <ProjectItem {...data} />
      <ProjectItem {...data} />
    </SimpleGrid>
  );
};

export default ProjectGrid;
