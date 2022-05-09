import { SimpleGrid } from "@chakra-ui/react";
import ProjectItem from "./ProjectItem/ProjectItem";

const ProjectGrid = ({ projectData, taskData, fetchUpdate }) => {
  const randomColor = [
    "green",
    "yellow",
    "blue",
    "purple",
    "orange",
    "pink",
    "red",
  ];

  return (
    <SimpleGrid columns={[1, 2, 4]} gap={5} py={5}>
      {projectData.map((project) => (
        <ProjectItem
          key={project.id}
          id={project.id}
          name={project.title}
          author={project.owner.firstName + " " + project.owner.lastName}
          createdTime={new Date(project.createdDate * 1000).toLocaleDateString(
            "en-IN"
          )}
          participants={project.participants}
          color={randomColor[project.id % randomColor.length]} // Mock for now
          openTasks={taskData.filter((obj) => obj.id === project.id).length} // Mock for now
          fetchUpdate={fetchUpdate}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProjectGrid;
