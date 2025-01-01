import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const getTasksForDate = (tasks, date) => {
  return tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === date.toDateString()
  );
};

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const allTasks = [
      ...storedTasks.inProgress,
      ...storedTasks.toDo,
      ...storedTasks.upcoming,
    ];
    setTasks(allTasks);
  }, []);

  const dailyTasks = getTasksForDate(tasks, selectedDate);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        📅 Task Calendar
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="bg-white rounded-lg overflow-hidden shadow-md">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="react-calendar border-none text-sm"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center md:text-left">
            Tasks for <span className="text-purple-600">{selectedDate.toDateString()}</span>
          </h3>
          {dailyTasks.length > 0 ? (
            <ul className="space-y-3">
              {dailyTasks.map((task, index) => (
                <li
                  key={index}
                  className="flex items-center bg-purple-100 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex-grow">
                    <p className="text-sm md:text-base font-medium text-purple-800">
                      {task.name}
                    </p>
                  </div>
                  <span className="bg-purple-500 text-white text-xs px-3 py-1 rounded-full">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500 mt-6">
              No tasks for this date. 
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
