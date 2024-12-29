import React, { useState, useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import NewContentModal from "./NewContentModal"; 

function Plans() {
  const [activeTab, setActiveTab] = useState("Content");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const cardRefs = useRef([]);
  
  const plansData = [
    {
      title: "Never do this if you want to grow your hair!",
      description:
        "3 home remedies to stop excessive hair fall for stressed working women",
      platform: "Instagram",
      hook: "Never do this if you want to grow your hair!",
      script:
        "3 home remedies to stop excessive hair fall for stressed working women",
      cta: "3 home remedies to stop excessive hair fall for stressed working women",
      targetAudience: "Working young girls",
      focus: "Community building",
      posting: "November 15, 2024",
      tasks: [
        {
          description: "Record video tomorrow",
          priority: "High",
          dueDate: "Tomorrow",
        },
      ],
    },
    
  ];

  const handleCardClick = (plan, index) => {
    setSelectedPlan(plan);
    cardRefs.current.forEach((card, i) => {
      card.style.backgroundColor = i === index ? "rgb(255, 219, 187)" : "";
    });
  };

  const closeModal = () => {
    setSelectedPlan(null);
    cardRefs.current.forEach((card) => (card.style.backgroundColor = ""));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative" onClick={closeModal}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Let's{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
            plan your content
          </span>{" "}
          together!
        </h1>
        <button
          onClick={handleOpenModal} 
          className="px-4 py-2 bg-white border-2 border-transparent font-semibold rounded-full shadow-md hover:bg-gray-100 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-500 hover:from-blue-500 hover:to-pink-600"
        >
          Start new content
        </button>
      </div>

     
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 pl-12">
        {plansData.map((plan, index) => (
          <div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            onClick={(event) => {
              event.stopPropagation();
              handleCardClick(plan, index);
            }}
            className="relative p-6 bg-white rounded-lg shadow-md cursor-pointer transition-colors duration-300 hover:bg-gray-50"
            style={{ width: "90%", height: "90%" }}
          >
            <div className="absolute -left-12 top-1/4 transform -translate-y-1/2 w-8 h-8 bg-white rounded-full border border-gray-300"></div>
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {plan.title}
              </h3>
              <p className="text-gray-500 mb-4">{plan.description}</p>
              <div className="flex items-center text-gray-500">
                <FaInstagram className="mr-2 text-pink-500" />
                <span>{plan.platform}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPlan && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeModal}
        >
        
          <div
            className="bg-white p-6 rounded-lg shadow-lg relative max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
          
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeModal}
            >
              &times;
            </button>
            
          </div>
        </div>
      )}

      
      {isModalOpen && (
        <NewContentModal
          closeModal={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default Plans;
