import React from "react";
import { Task } from "../ProjectType";

interface TaskListProps {
  wbsId: number;
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ wbsId, tasks }) => {
  return (
    <div style={{ paddingLeft: "40px" }}>
      {tasks
        .filter((task) => task.wbsId === wbsId)
        .map((task) => (
          <p key={task.id} style={{ fontWeight: "bold", marginTop: "10px" }}>
            {task.name}
          </p>
        ))}
    </div>
  );
};

export default TaskList;
