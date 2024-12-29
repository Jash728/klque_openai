import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaTwitter, FaGlobe } from 'react-icons/fa';

function PlatformSelection({ onSelectPlatform }) {
  const platforms = [
    { icon: <FaInstagram className="text-pink-500" />, value: 'instagram' },
    { icon: <FaFacebook className="text-blue-600" />, value: 'facebook' },
    { icon: <FaLinkedin className="text-blue-700" />, value: 'linkedin' },
    { icon: <FaTwitter className="text-blue-400" />, value: 'twitter' },
    { icon : <FaGlobe className="text-gray-500" /> ,value : 'Other'}
  ];

  return (
    <div className="flex justify-around mt-8">
      {platforms.map((platform) => (
        <button
          key={platform.value}
          onClick={() => onSelectPlatform(platform.value)}
          className="text-3xl p-4 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          {platform.icon}
        </button>
      ))}
    </div>
  );
}

export default PlatformSelection;
