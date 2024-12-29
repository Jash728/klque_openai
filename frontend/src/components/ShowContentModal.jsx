import React, { useState } from "react";

function ShowContentModal({ content, closeModal, onUpdateContent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedContent, setUpdatedContent] = useState(content);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedContent((prevContent) => ({ ...prevContent, [name]: value }));
  };

  const handleSave = () => {
    onUpdateContent(updatedContent);
    setIsEditing(false);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
      onClick={closeModal}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative max-w-lg w-full max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          &times;
        </button>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isEditing ? "Edit Content" : content.title}
          </h2>
          <button
            className="text-gray-500 hover:text-blue-500 transition"
            onClick={() => setIsEditing(!isEditing)}
          >
            ✏️ {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs text-gray-600 font-semibold mb-3">
          <span>Content Pillar</span>
          <span>Content Type</span>
          <span>Platform</span>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
            {content.contentPillar}
          </span>
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
            {content.contentType}
          </span>
          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-semibold">
            {content.platform}
          </span>
        </div>

        <div className="space-y-4 text-sm text-gray-800">
          {["hook", "script", "cta", "targetAudience", "focus", "posting"].map((field, idx) => (
            <div key={idx} className="flex items-start mb-4">
              <span className="w-32 font-medium">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
              {isEditing ? (
                <input
                  name={field}
                  value={updatedContent[field]}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <span className="flex-1 font-semibold break-words">{content[field]}</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-semibold text-orange-500">Tasks</h3>
            <button className="text-orange-500 font-semibold text-xs flex items-center hover:text-orange-700 transition">
              <span className="mr-1">+</span> Add Task
            </button>
          </div>
          <div className="border-b border-gray-200 py-3 space-y-2">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2 accent-blue-500" />
              <span className="flex-1 text-gray-700 text-sm">Record video tomorrow</span>
              <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">High</span>
              <span className="ml-3 text-gray-500 text-sm">Tomorrow</span>
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowContentModal;
