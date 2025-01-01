import { useState } from "react";
import { FaInstagram } from "react-icons/fa";

const DeletedCard = () => {
  const [activeTab, setActiveTab] = useState("Content");
  const [completedCards, setCompletedCards] = useState([]); 

  const handleToggleComplete = (id) => {
    setCompletedCards((prev) =>
      prev.includes(id) ? prev.filter((cardId) => cardId !== id) : [...prev, id]
    );
  };

  
  const filteredContent = activeTab === "Completed"
    ? contentData.filter((content) => completedCards.includes(content.id))
    : contentData;

  return (
    <div>
      <div className="flex mb-6 space-x-4">
        {["Content", "Platform", "Tasks", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-lg font-semibold pb-2 ${
              activeTab === tab
                ? "text-orange-600 border-b-4 border-orange-500"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="content-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 pl-8">
        {filteredContent.map((content) => (
          <div
            key={content.id}
            className={`relative p-4 rounded-md shadow-md cursor-pointer transition-colors duration-300 ${
              completedCards.includes(content.id)
                ? "bg-orange-100"
                : "bg-white hover:bg-gray-50"
            }`}
            onClick={() => handleCardClick(content)}
          >
            <div
              className={`absolute -left-10 top-1/4 transform -translate-y-1/2 w-6 h-6 rounded-full border cursor-pointer ${
                completedCards.includes(content.id) ? "bg-orange-500" : "bg-white"
              }`}
              onClick={(e) => {
                e.stopPropagation(); 
                handleToggleComplete(content.id);
              }}
            ></div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{content.hook}</h3>
              <p className="text-sm text-gray-500 mb-2">{content.script}</p>

              <div className="flex items-center text-gray-500 text-sm">
                <FaInstagram className="mr-1 text-pink-500" />
                <span>{content.platform}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletedCard;
