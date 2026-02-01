import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";
import CVEditor from "./CVEditor";

const AboutMeEditor = () => {
  const { aboutContent, getInTouchContent, updateAboutContent, updateGetInTouchContent } = useAdmin();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("about");
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [isEditingGetInTouch, setIsEditingGetInTouch] = useState(false);
  const [editAboutContent, setEditAboutContent] = useState(aboutContent);
  const [editGetInTouchContent, setEditGetInTouchContent] = useState(
    getInTouchContent
  );

  const handleAboutChange = (e) => {
    const { name, value } = e.target;
    setEditAboutContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleGetInTouchChange = (e) => {
    const { name, value } = e.target;
    setEditGetInTouchContent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveAbout = () => {
    updateAboutContent(editAboutContent);
    setIsEditingAbout(false);
    alert("About Me content updated successfully!");
  };

  const handleCancelAbout = () => {
    setEditAboutContent(aboutContent);
    setIsEditingAbout(false);
  };

  const handleSaveGetInTouch = () => {
    updateGetInTouchContent(editGetInTouchContent);
    setIsEditingGetInTouch(false);
    alert("Get in Touch content updated successfully!");
  };

  const handleCancelGetInTouch = () => {
    setEditGetInTouchContent(getInTouchContent);
    setIsEditingGetInTouch(false);
  };

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-300">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "about"
              ? "border-b-4 border-light text-light"
              : "text-gray-500"
          }`}
        >
          About Me
        </button>
        <button
          onClick={() => setActiveTab("getInTouch")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "getInTouch"
              ? "border-b-4 border-light text-light"
              : "text-gray-500"
          }`}
        >
          Get in Touch
        </button>
        <button
          onClick={() => setActiveTab("cv")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "cv"
              ? "border-b-4 border-light text-light"
              : "text-gray-500"
          }`}
        >
          CV/Experience
        </button>
      </div>

      {/* About Me Tab */}
      {activeTab === "about" && (
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {!isEditingAbout ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">About Me</h2>
                <button
                  onClick={() => setIsEditingAbout(true)}
                  className="px-6 py-2 bg-light text-black rounded-lg hover:opacity-80 transition font-semibold"
                >
                  Edit
                </button>
              </div>
              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">
                  {editAboutContent.title}
                </h3>
                <p className="text-base whitespace-pre-wrap leading-relaxed">
                  {editAboutContent.content}
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">Edit About Me Content</h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editAboutContent.title}
                    onChange={handleAboutChange}
                    placeholder="Section title"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={editAboutContent.content}
                    onChange={handleAboutChange}
                    placeholder="Write your about me content here..."
                    rows="12"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none font-sans ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Use new lines to create paragraphs
                  </p>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Preview
                  </label>
                  <div
                    className={`p-6 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-4">
                      {editAboutContent.title}
                    </h3>
                    <p className="text-base whitespace-pre-wrap leading-relaxed">
                      {editAboutContent.content}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    onClick={handleCancelAbout}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveAbout}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* Get in Touch Tab */}
      {activeTab === "getInTouch" && (
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          {!isEditingGetInTouch ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Get in Touch</h2>
                <button
                  onClick={() => setIsEditingGetInTouch(true)}
                  className="px-6 py-2 bg-light text-black rounded-lg hover:opacity-80 transition font-semibold"
                >
                  Edit
                </button>
              </div>
              <div
                className={`p-6 rounded-lg ${
                  isDarkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <h3 className="text-xl font-bold mb-4">
                  {editGetInTouchContent.title}
                </h3>
                <p className="text-base whitespace-pre-wrap leading-relaxed">
                  {editGetInTouchContent.content}
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Edit Get in Touch Content
              </h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editGetInTouchContent.title}
                    onChange={handleGetInTouchChange}
                    placeholder="Section title"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                </div>

                {/* Content */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Content
                  </label>
                  <textarea
                    name="content"
                    value={editGetInTouchContent.content}
                    onChange={handleGetInTouchChange}
                    placeholder="Write your get in touch content here..."
                    rows="12"
                    className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none font-sans ${
                      isDarkMode
                        ? "bg-gray-800 text-white"
                        : "bg-white text-black"
                    }`}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Tip: Use new lines to create paragraphs
                  </p>
                </div>

                {/* Preview */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Preview
                  </label>
                  <div
                    className={`p-6 rounded-lg ${
                      isDarkMode ? "bg-gray-800" : "bg-gray-100"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-4">
                      {editGetInTouchContent.title}
                    </h3>
                    <p className="text-base whitespace-pre-wrap leading-relaxed">
                      {editGetInTouchContent.content}
                    </p>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 justify-end pt-4">
                  <button
                    onClick={handleCancelGetInTouch}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveGetInTouch}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* CV Tab */}
      {activeTab === "cv" && (
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <CVEditor />
        </div>
      )}
    </div>
  );
};

export default AboutMeEditor;
