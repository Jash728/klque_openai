import React from 'react';

const AddExperienceModal = ({ isOpen, onClose, onAdd, newExperience, setNewExperience }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h3 className="text-lg font-semibold mb-4">Add New Experience</h3>
                <input
                    type="text"
                    placeholder="Enter experience"
                    value={newExperience}
                    onChange={(e) => setNewExperience(e.target.value)}
                    className="border p-2 rounded w-full mb-4"
                />
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="px-3 py-1 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onAdd}
                        className="px-3 py-1 bg-purple-500 text-white rounded-lg text-sm hover:bg-purple-600"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddExperienceModal;
