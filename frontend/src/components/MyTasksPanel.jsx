import React, { useEffect, useState } from "react";
import { FaPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";

const MyTasksPanel = ({ onAddTask }) => {
  const [tasks, setTasks] = useState({
    inProgress: [],
    toDo: [],
    upcoming: [],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [expandedSections, setExpandedSections] = useState({
    inProgress: false,
    toDo: false,
    upcoming: false,
  });

  useEffect(() => {
    
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || {
      inProgress: [],
      toDo: [],
      upcoming: [],
    };
    setTasks(storedTasks);
  }, []);

  const saveTasksToLocalStorage = (updatedTasks) => {
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleAddTask = () => {
    if (!taskName || !taskDate) return;

    const taskDueDate = new Date(taskDate);
    const today = new Date();
    const differenceInDays = Math.ceil(
      (taskDueDate - today) / (1000 * 60 * 60 * 24)
    );

    const newTask = { name: taskName, dueDate: taskDate };

    let updatedTasks = { ...tasks };

    if (differenceInDays <= 0) {
      updatedTasks.inProgress.push(newTask);
    } else if (differenceInDays === 1) {
      updatedTasks.toDo.push(newTask);
    } else {
      updatedTasks.upcoming.push(newTask);
    }

    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    setTaskName("");
    setTaskDate("");
    setIsModalOpen(false);

    if (typeof onAddTask === "function") onAddTask(newTask);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDueDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto md:max-w-none relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">My Tasks</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-purple-500 hover:text-purple-700 focus:outline-none"
          aria-label="Add new task"
        >
          <FaPlus className="w-5 h-5" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Add New Task</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                placeholder="Enter task name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Due Date
              </label>
              <input
                type="date"
                value={taskDate}
                onChange={(e) => setTaskDate(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded w-full"
              />
            </div>
            <button
              onClick={handleAddTask}
              className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
              Add Task
            </button>
          </div>
        </div>
      )}

      
      {["inProgress", "toDo", "upcoming"].map((section) => (
        <div key={section} className="mb-4">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => tasks[section]?.length > 0 && toggleSection(section)}
          >
            <div className="flex items-center space-x-2">
              {tasks[section]?.length > 0 && (
                <button aria-label="Expand section">
                  {expandedSections[section] ? (
                    <FaChevronUp className="w-4 h-4 text-gray-500" />
                  ) : (
                    <FaChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              )}
              <span
                className={`text-sm md:text-base font-semibold px-3 py-1 rounded-full ${
                  section === "inProgress"
                    ? "bg-blue-100 text-blue-600"
                    : section === "toDo"
                    ? "bg-gray-100 text-gray-600"
                    : "bg-orange-100 text-orange-600"
                }`}
              >
                {section === "inProgress"
                  ? "In Progress"
                  : section === "toDo"
                  ? "To Do"
                  : "Upcoming"}
              </span>
              <span className="text-xs md:text-sm text-gray-500">
                &nbsp;• {tasks[section]?.length}{" "}
                {tasks[section]?.length === 1 ? "task" : "tasks"}
              </span>
            </div>
          </div>

          {expandedSections[section] && (
            <>
              <div className="grid grid-cols-3 gap-2 mt-2 text-xs font-semibold text-gray-600 border-b border-gray-300 pb-2">
                <span className="text-left">Task Name</span>
                <span className="text-center">Urgency</span>
                <span className="text-right">Due Date</span>
              </div>

              {tasks[section]?.map((task, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-2 bg-gray-50 p-2 mt-1 rounded-lg items-center shadow-sm"
                >
                  <p className="text-sm font-medium text-left">{task.name}</p>
                  <p className="text-sm font-semibold text-center">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        section === "inProgress"
                          ? "bg-red-100 text-red-600 border border-red-600"
                          : section === "toDo"
                          ? "bg-yellow-100 text-yellow-600 border border-yellow-600"
                          : "bg-green-100 text-green-600 border border-green-600"
                      }`}
                    >
                      {section === "inProgress"
                        ? "High"
                        : section === "toDo"
                        ? "Medium"
                        : "Low"}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500 text-right">
                    {formatDueDate(task.dueDate)}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyTasksPanel;
