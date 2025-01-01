import React, { useState } from 'react';
import { FaPen, FaTrash, FaExpandAlt, FaCog } from 'react-icons/fa';
import AddExperienceModal from './AddExperienceModal';

const ExperienceCard = () => {
    const [experiences, setExperiences] = useState([
        { id: 1, text: "Our common language: Chai" },
    ]);
    const [isEditing, setIsEditing] = useState(null);
    const [newExperience, setNewExperience] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddExperience = () => {
        if (newExperience.trim()) {
            setExperiences([
                ...experiences,
                { id: Date.now(), text: newExperience.trim() },
            ]);
            setNewExperience(""); 
            setIsModalOpen(false); 
        }
    };

    const handleDeleteExperience = (id) => {
        setExperiences(experiences.filter((experience) => experience.id !== id));
    };

    const handleEditExperience = (id, currentText) => {
        setIsEditing(id);
        setNewExperience(currentText);
    };

    const handleSaveEdit = (id) => {
        setExperiences(
            experiences.map((experience) =>
                experience.id === id ? { ...experience, text: newExperience } : experience
            )
        );
        setIsEditing(null);
        setNewExperience("");
    };

    return (
        <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg w-full max-w-md mx-auto md:mx-0 md:max-w-none">
        
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 flex items-center space-x-2">
                    <FaPen className="text-orange-500" />
                    <span>My Ideas</span>
                </h2>
                {/* <div className="flex items-center space-x-2">
                    <FaExpandAlt className="text-gray-500 cursor-pointer hover:text-gray-700" />
                    <FaCog className="text-gray-500 cursor-pointer hover:text-gray-700" />
                </div> */}
            </div>

            
            {experiences.map((experience) => (
                <div
                    className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                    key={experience.id}
                >
                    {isEditing === experience.id ? (
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={newExperience}
                                onChange={(e) => setNewExperience(e.target.value)}
                                className="border p-2 rounded-lg w-full"
                            />
                            <button
                                onClick={() => handleSaveEdit(experience.id)}
                                className="px-3 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            <p className="text-gray-700">{experience.text}</p>
                        </div>
                    )}
                    <div className="flex space-x-2">
                        <FaPen
                            className="text-purple-600 cursor-pointer hover:text-gray-700"
                            onClick={() => handleEditExperience(experience.id, experience.text)}
                        />
                        <FaTrash
                            className="text-orange-500 cursor-pointer hover:text-gray-700"
                            onClick={() => handleDeleteExperience(experience.id)}
                        />
                    </div>
                </div>
            ))}

           
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
            >
                Add New Experience
            </button>

           
            <AddExperienceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onAdd={handleAddExperience}
                newExperience={newExperience}
                setNewExperience={setNewExperience}
            />
        </div>
    );
};

export default ExperienceCard;
