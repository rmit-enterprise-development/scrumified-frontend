import { SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = ({ projectData, fetchUpdate }) => {
  console.log("projectData: ", projectData);
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
    <SimpleGrid columns={[1, 2, 4]} gap={5} py={5}>
      {projectData.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          color={randomColor[project.id % randomColor.length]} // Mock for now
          fetchUpdate={fetchUpdate}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProjectGrid;
