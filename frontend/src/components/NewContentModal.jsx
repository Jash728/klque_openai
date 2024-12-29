import React, { useState } from "react";

function NewContentModal({ isOpen, onClose, onSubmit }) {
  const [hook, setHook] = useState("");
  const [script, setScript] = useState("");
  const [cta, setCta] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [focus, setFocus] = useState("");
  const [posting, setPosting] = useState("");
  const [contentPillar, setContentPillar] = useState("");
  const [contentType, setContentType] = useState("");
  const [platform, setPlatform] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContent = {
      hook,
      script,
      cta,
      targetAudience,
      focus,
      posting,
      contentPillar,
      contentType,
      platform,
    };
    onSubmit(newContent);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div
        className="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-purple-500"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Create New Content</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Hook</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Script</label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              rows="4"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">CTA</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Target Audience</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Focus</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Posting Date</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={posting}
                onChange={(e) => setPosting(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Content Pillar</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={contentPillar}
                onChange={(e) => setContentPillar(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Content Type</label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                value={contentType}
                onChange={(e) => setContentType(e.target.value)}
                required
              />
            </div>

            <div>
            <label>
            Platform:
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="other">Other</option>
            </select>
          </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-300"
          >
            Create Content
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewContentModal;
