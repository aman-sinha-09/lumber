import React, { useState, useRef, useEffect } from "react";
import { WBS, Task } from "../ProjectType";
import TaskList from "./TaskList";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";

interface WbsListProps {
  projectId: number;
  wbs: WBS[];
  tasks: Task[];
}

const WbsList: React.FC<WbsListProps> = ({ projectId, wbs, tasks }) => {
  const [expandedWbs, setExpandedWbs] = useState<number[]>([]);
  const [selectedWbs, setSelectedWbs] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleWbs = (wbsId: number) => {
    setExpandedWbs((prevExpandedWbs) =>
      prevExpandedWbs.includes(wbsId)
        ? prevExpandedWbs.filter((id) => id !== wbsId)
        : [...prevExpandedWbs, wbsId]
    );
    setSelectedWbs(wbsId);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setSelectedWbs(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ paddingLeft: "20px" }}>
      {wbs
        .filter((item) => item.projectId === projectId)
        .map((item) => (
          <div key={item.id}>
            <h3
              onClick={() => toggleWbs(item.id)}
              style={{
                cursor: "pointer",
                backgroundColor:
                  selectedWbs === item.id
                    ? "rgba(211,227,247,255)"
                    : "transparent",
                padding: "5px",
                borderRadius: "5px",
                marginBottom: "0px",
                marginTop: "0px",
              }}
            >
              {expandedWbs.includes(item.id) ? (
                <IoIosArrowDown />
              ) : (
                <IoIosArrowForward />
              )}{" "}
              {item.name}
            </h3>
            {expandedWbs.includes(item.id) && (
              <TaskList wbsId={item.id} tasks={tasks} />
            )}
          </div>
        ))}
    </div>
  );
};

export default WbsList;
