// ContentCard.jsx

import React from "react";

const ContentCard = ({ title, description, platform }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col justify-between space-y-2 hover:shadow-lg transition-shadow duration-200">
      
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      <p className="text-sm text-gray-500">{description}</p>
      
     
      <div className="flex justify-between items-center text-sm text-gray-400">
        <div className="flex items-center gap-1">
          <span role="img" aria-label="platform">📷</span> 
          {platform}
        </div>
        <span role="img" aria-label="lightning">⚡</span> 
      </div>
    </div>
  );
};

export default ContentCard;
