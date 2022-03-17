import { Box, SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem";

const ProjectGrid = () => {
  const data = {
    name: "Project Name",
    description: "Project Description",
    createdTime: "Created at: ",
    lastUpdatedTime: "Last update: ",
  };
  return (
    <SimpleGrid columns={[1, 1, 2]} gap={3}>
      <ProjectItem {...data} />
      <ProjectItem {...data} />
      <ProjectItem {...data} />
      <ProjectItem {...data} />
    </SimpleGrid>
  );
};

export default ProjectGrid;
