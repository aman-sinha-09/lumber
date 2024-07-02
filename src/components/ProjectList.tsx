import React, { useState } from "react";
import { Project, WBS, Task } from "../ProjectType";
import WbsList from "./WbsList";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

interface ProjectListProps {
  projects: Project[];
  wbs: WBS[];
  tasks: Task[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, wbs, tasks }) => {
  const [expandedProjects, setExpandedProjects] = useState<number[]>([]);

  const toggleProject = (projectId: number) => {
    setExpandedProjects(
      expandedProjects.includes(projectId)
        ? expandedProjects.filter((id) => id !== projectId)
        : [...expandedProjects, projectId]
    );
  };

  return (
    <div>
      {projects.map((project) => (
        <div key={project.id}>
          <h2
            onClick={() => toggleProject(project.id)}
            style={{ cursor: "pointer", marginBottom: "9px" }}
          >
            {expandedProjects.includes(project.id) ? (
              <IoIosArrowDown />
            ) : (
              <IoIosArrowForward />
            )}{" "}
            {project.name}
          </h2>
          {expandedProjects.includes(project.id) && (
            <WbsList projectId={project.id} wbs={wbs} tasks={tasks} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
