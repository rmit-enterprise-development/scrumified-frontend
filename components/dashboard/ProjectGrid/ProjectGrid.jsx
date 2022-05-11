import { SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = ({
  projectData,
  fetchUpdatedProject,
  fetchProjectStory,
}) => {
  const randomColor = [
    "green",
    "yellow",
    "blue",
    "purple",
    "orange",
    "pink",
    "red",
  ];

  // openTasks={taskData.filter((obj) => obj.id === project.id).length} // Mock for now
  return (
    <SimpleGrid columns={[1, 2, 2, 4]} gap={5} pb={3}>
      {projectData.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          color={randomColor[project.id % randomColor.length]} // Mock for now
          fetchUpdatedProject={fetchUpdatedProject}
          fetchProjectStory={fetchProjectStory}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProjectGrid;
