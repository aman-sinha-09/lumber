import React, { useState, useEffect } from "react";
import ProjectList from "./components/ProjectList";
import { Project, WBS, Task } from "./ProjectType";
import "./styles.css";

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [wbs, setWbs] = useState<WBS[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const projectResponse = await fetch("/project.json");
      const wbsResponse = await fetch("/wbs.json");
      const taskResponse = await fetch("/task.json");

      const projectData = await projectResponse.json();
      const wbsData = await wbsResponse.json();
      const taskData = await taskResponse.json();

      setProjects(projectData);
      setWbs(wbsData);
      setTasks(taskData);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ProjectList projects={projects} wbs={wbs} tasks={tasks} />
    </div>
  );
};

export default App;
