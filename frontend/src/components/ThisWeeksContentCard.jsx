import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Modal from './Modal';

const ThisWeeksContentCard = ({ tasks = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekTasks, setWeekTasks] = useState([]);
  const [tasksForTheWeek, setTasksForTheWeek] = useState(tasks);
  const [selectedTasks, setSelectedTasks] = useState([]);

  const getTasksForDate = (date) => {
    const allTasks = [...tasks.inProgress, ...tasks.toDo, ...tasks.upcoming];
    return allTasks.filter(
      (task) => new Date(task.dueDate).toDateString() === date.toDateString()
    );
  };

  const initializeWeekTasks = () => {
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const tasksForWeek = Array.from({ length: 7 }).map((_, index) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);
      return { date: dayDate, tasks: getTasksForDate(dayDate) };
    });

    setWeekTasks(tasksForWeek);
  };

  useEffect(() => {
    setTasksForTheWeek(tasks);
    initializeWeekTasks();
    setSelectedTasks(getTasksForDate(new Date()));
  }, [tasks]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedTasks(getTasksForDate(date));
  };

  
  const isDueTomorrow = (taskDate) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return taskDate.toDateString() === tomorrow.toDateString();
  };

  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto md:max-w-none">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold flex items-center space-x-2">
          <FaCalendarAlt className="text-orange-500 cursor-pointer" onClick={openModal} />
          <span>This Week's Content</span>
        </h2>
        <span className="text-xs text-gray-500">Week of {startOfWeek.toLocaleDateString()}</span>
      </div>

      <div className="grid grid-cols-7 gap-4 mb-4">
        {weekTasks.map((day, index) => (
          <div
            key={index}
            className={`flex flex-col items-center p-2 rounded-lg cursor-pointer transition duration-200 ease-in-out ${
              day.date.toDateString() === new Date().toDateString() ? 'bg-blue-100 shadow-md' : 'hover:bg-gray-50'
            }`}
            onClick={() => handleDateClick(day.date)}
          >
            <span
              className={`text-sm font-semibold ${
                day.date.toDateString() === new Date().toDateString() ? 'text-blue-500' : 'text-gray-600'
              }`}
            >
              {day.date.toLocaleDateString('en-US', { weekday: 'short' })}
            </span>
            <span className="text-xs text-gray-400">{day.date.getDate()}</span>
            {day.tasks && day.tasks.length > 0 ? (
              <div className="mt-2 text-xs text-orange-500">
                {day.tasks.slice(0, 2).map((task, taskIndex) => (
                 <span key={taskIndex} className="block">
                 {task.name.length > 5 ? task.name.substring(0, 5) + '...' : task.name}
               </span>
                ))}
                {day.tasks.length > 2 && <span className="text-xs text-gray-400">+{day.tasks.length - 2} more</span>}
              </div>
            ) : (
              <span className="text-xs text-gray-400 mt-1">No tasks</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Tasks for {selectedDate.toLocaleDateString()}</h3>
        {selectedTasks.length > 0 ? (
          <div className="space-y-2">
            {selectedTasks.map((task, index) => {
              const taskDueDate = new Date(task.dueDate);
              return (
                <div
                  key={index}
                  className={`flex justify-between items-center p-2 rounded-lg shadow-sm ${
                    isDueTomorrow(taskDueDate)
                      ? 'border-2 border-red-500 bg-red-100' 
                      : 'border-2 border-gray-300 bg-gray-100' 
                  }`}
                >
                  <span className="text-sm font-semibold text-gray-800">{task.name}</span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full text-white ${
                      task.priority === 'high'
                        ? 'bg-red-500'
                        : task.priority === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-xs text-gray-400">No tasks for this date</div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h3 className="text-lg font-semibold mb-4">Select a Date</h3>
        <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} inline />
      </Modal>
    </div>
  );
};

export default ThisWeeksContentCard;
