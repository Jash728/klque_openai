import React, { useState } from "react";
import MyTasksPanel from "./MyTasksPanel";
import ThisWeeksContentCard from "./ThisWeeksContentCard";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState({
    inProgress: [],
    toDo: [],
    upcoming: [],
  });

  const addTask = (newTask, differenceInDays) => {
    console.log("Adding Task:", newTask); 

    if (differenceInDays <= 1) {
      setTasks((prevTasks) => {
        console.log("Updated inProgress:", [...prevTasks.inProgress, newTask]); 
        return {
          ...prevTasks,
          inProgress: [...prevTasks.inProgress, newTask],
        };
      });
    } else if (differenceInDays > 1 && differenceInDays <= 7) {
      setTasks((prevTasks) => {
        console.log("Updated toDo:", [...prevTasks.toDo, newTask]); 
        return {
          ...prevTasks,
          toDo: [...prevTasks.toDo, newTask],
        };
      });
    } else {
      setTasks((prevTasks) => {
        console.log("Updated upcoming:", [...prevTasks.upcoming, newTask]); 
        return {
          ...prevTasks,
          upcoming: [...prevTasks.upcoming, newTask],
        };
      });
    }
  };

  console.log("Current Tasks:", tasks); 

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6">
       

        <ThisWeeksContentCard tasks={tasks} />
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <MyTasksPanel tasks={tasks} onAddTask={addTask} />
      </div>
    </>
  );
};

export default TaskDashboard;
