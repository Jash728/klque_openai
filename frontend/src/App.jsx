import { useState } from "react";
import Sidebar from './components/Sidebar';
import HomePage from './components/HomePage';
import Plans from './components/Plans'; 
import { Route, Routes } from "react-router-dom";
import AiPage from "./components/AiPage";
import Chat from "./components/Chat";
import ContentPage from "./components/ContentPage";
import CalendarPage from "./components/CalendarPage";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      <div className="flex flex-col flex-grow overflow-y-auto">  
        <header className="p-4 bg-white shadow-md md:hidden flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>

        <main className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/ai" element={<AiPage />} /> 
            <Route path="/plans" element={<Plans />} /> 
            <Route path="/contentPage" element={<ContentPage />} />
            <Route path="/chat" element={<Chat />} /> 
            <Route path="*" element={<div>404 - Not Found</div>} /> 
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
