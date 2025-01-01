import { useState } from "react";
import { FaHome, FaRegCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [active, setActive] = useState("Home");
  const navigate = useNavigate();  

  const handleActive = (item) => {
    setActive(item);
    if (isOpen) toggleSidebar(); 

    
    if (item === "Plan") {
      navigate("/contentPage");  
    }
    if (item === "Calendar") {
      navigate("/calendar");
    }
    
    if (item === "Home") {
      navigate("/");  
    }
    if(item=="Ideate"){
      navigate("/ai")
    }
  };

  return (
    <div
      className={`fixed md:static inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 transition-transform duration-300 ease-in-out w-64 bg-gray-50 h-full shadow-lg p-4 flex flex-col justify-between z-50`}
    >
      <div className="flex items-center mb-8">
  <img
    src="https://via.placeholder.com/100"
    alt="Profile"
    className="w-16 h-16 rounded-full"
  />
  <div className="ml-4"> 
    <h2 className="text-lg font-semibold">Akshita Gupta</h2>
    <span className="text-green-500 text-sm">Online</span>
  </div>
</div>


      <nav className="flex flex-col space-y-4">
        {["Ideate", "Home", "Plan", "Calendar"].map((item) => (
          <button
            key={item}
            onClick={() => handleActive(item)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
              active === item ? "bg-orange-200 text-orange-700" : "text-gray-700"
            } hover:text-purple-600`}
          >
            <span>
              {item === "Home" ? <FaHome className="text-orange-500" /> : 
               item === "Plan" ? <FaRegCalendarAlt className="text-orange-500" /> : 
               item === "Ideate" ? "⚡" : "📅"}
            </span>
            <span>{item}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto">
        <button
          onClick={() => handleActive("Settings")}
          className={`block w-full text-left px-3 py-2 rounded-lg ${
            active === "Settings" ? "bg-orange-200 text-orange-700" : "text-gray-700"
          } hover:text-purple-600 mb-4`}
        >
          Settings
        </button>
        <button
          onClick={() => handleActive("Logout")}
          className={`block w-full text-left px-3 py-2 rounded-lg ${
            active === "Logout" ? "bg-orange-200 text-orange-700" : "text-gray-700"
          } hover:text-purple-600 mb-8`}
        >
          Logout
        </button>

        <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg p-4 flex flex-col items-center">
          <p className="text-sm">Refer and get early access to new updates and features.</p>
          <button className="mt-2 bg-white text-purple-600 rounded-full px-4 py-1 text-sm font-semibold">
            Invite people
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
