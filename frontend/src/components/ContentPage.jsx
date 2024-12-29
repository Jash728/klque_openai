import React, { useState } from "react";
import PlatformSelection from "./PlatformSelection";
import PlatformContent from "./PlatformContent";
import NewContentModal from "./NewContentModal";
import ShowContentModal from "./ShowContentModal";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaPlus,
} from "react-icons/fa";

function ContentPage() {
  const [contentData, setContentData] = useState([]);
  const [isNewContentModalOpen, setIsNewContentModalOpen] = useState(false);
  const [isShowContentModalOpen, setIsShowContentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Content");
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);

  const platformIcons = {
    instagram: <FaInstagram className="text-pink-500 mr-1" />,
    facebook: <FaFacebook className="text-blue-600 mr-1" />,
    linkedin: <FaLinkedin className="text-blue-700 mr-1" />,
    twitter: <FaTwitter className="text-blue-400 mr-1" />,
    other: <FaGlobe className="text-gray-500 mr-1" />,
  };

  const openNewContentModal = () => setIsNewContentModalOpen(true);
  const closeNewContentModal = () => setIsNewContentModalOpen(false);

  const handleCardClick = (content) => {
    setSelectedContent(content);
    setSelectedCardId(content.id);
    setIsShowContentModalOpen(true);
  };

  const closeShowContentModal = () => {
    setIsShowContentModalOpen(false);
    setSelectedContent(null);
    setSelectedCardId(null);
  };

  const handleNewContent = (newContent) => {
    const newContentWithId = {
      ...newContent,
      id: new Date().getTime(),
      completed: false,
    };
    setContentData((prevData) => [...prevData, newContentWithId]);
  };

  const markAsCompleted = (id) => {
    setContentData((prevData) =>
      prevData.map((content) =>
        content.id === id ? { ...content, completed: true } : content
      )
    );
  };

  const updateContent = (updatedContent) => {
    setContentData((prevData) =>
      prevData.map((content) =>
        content.id === updatedContent.id ? updatedContent : content
      )
    );
    setSelectedContent(updatedContent);
  };

  const displayedContent =
    activeTab === "Completed"
      ? contentData.filter((content) => content.completed)
      : contentData.filter((content) => !content.completed);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Let's{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
            plan your content
          </span>{" "}
          together!
        </h1>
        <button
          onClick={openNewContentModal}
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

      {displayedContent.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pl-8">
          <div
            className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer rounded-md shadow-md border border-gray-300 p-10 w-96" 
            onClick={openNewContentModal}
          >
            <FaPlus className="text-6xl mb-2" />
            <p className="text-xl font-semibold">Add new content</p>
          </div>
        </div>
      ) : (
        <div className="content-container">
          <div className="content-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-12 pl-8">
            {" "}
            
            {displayedContent.map((content) => (
              <div
                key={content.id}
                className={`relative p-8 rounded-md shadow-md cursor-pointer transition-colors duration-300 ${
                  selectedCardId === content.id
                    ? "bg-orange-100"
                    : "bg-white hover:bg-gray-50"
                } w-96`} 
                onClick={() => handleCardClick(content)}
                style={{ maxWidth: "100%" }}
              >
                <div
                  className="absolute -left-10 top-1/4 transform -translate-y-1/2 w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    markAsCompleted(content.id);
                  }}
                >
                  {content.completed ? (
                    <span className="text-green-500 text-xl">✓</span>
                  ) : (
                    <div className="w-4 h-4 bg-transparent"></div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {content.hook}
                  </h3>
                  <p className="text-base text-gray-500 mb-2">
                    {content.script}
                  </p>

                  <div className="flex items-center text-gray-500 text-base">
                    {platformIcons[content.platform]}
                    <span>
                      {content.platform.charAt(0).toUpperCase() +
                        content.platform.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 pl-8">
              <div
                className="flex flex-col items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer rounded-md shadow-md border border-gray-300 p-10 w-96" 
                onClick={openNewContentModal}
              >
                <FaPlus className="text-6xl mb-2" />
                <p className="text-xl font-semibold">Add new content</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {isNewContentModalOpen && (
        <NewContentModal
          isOpen={isNewContentModalOpen}
          onClose={closeNewContentModal}
          onSubmit={handleNewContent}
        />
      )}
      {isShowContentModalOpen && (
        <ShowContentModal
          content={selectedContent}
          closeModal={closeShowContentModal}
          onUpdateContent={updateContent}
        />
      )}
    </div>
  );
}

export default ContentPage;
