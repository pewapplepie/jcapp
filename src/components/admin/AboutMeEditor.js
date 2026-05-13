import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";
import CVEditor from "./CVEditor";

const applyTitlePrefix = (title, prefix) => {
  const cleanTitle = title.replace(/^#{1,3}\s/, "").trimStart();

  if (!prefix) {
    return cleanTitle;
  }

  return `${prefix}${cleanTitle}`;
};

const renderPreviewTitle = (title) => {
  const trimmedTitle = title.trim();

  if (trimmedTitle.startsWith("# ")) {
    return <div className="m-0 text-base font-newsreader font-medium leading-8 md:text-[1.05rem]">{trimmedTitle.replace(/^#\s/, "")}</div>;
  }

  if (trimmedTitle.startsWith("## ")) {
    return <div className="m-0 text-base font-semibold uppercase tracking-[0.18em] leading-8 md:text-[1.05rem]">{trimmedTitle.replace(/^##\s/, "")}</div>;
  }

  if (trimmedTitle.startsWith("### ")) {
    return <div className="m-0 text-base font-semibold leading-8 md:text-[1.05rem]">{trimmedTitle.replace(/^###\s/, "")}</div>;
  }

  return <div className="m-0 text-base font-medium leading-8 md:text-[1.05rem]">{title}</div>;
};

const AboutMeEditor = () => {
  const { getInTouchContent, updateGetInTouchContent } = useAdmin();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("about");
  const [isEditingGetInTouch, setIsEditingGetInTouch] = useState(false);
  const [editGetInTouchContent, setEditGetInTouchContent] = useState(
    getInTouchContent
  );

  const handleGetInTouchChange = (e) => {
    const { name, value } = e.target;
    setEditGetInTouchContent((prev) => ({ ...prev, [name]: value }));
  };

  const setGetInTouchTitleStyle = (prefix) => {
    setEditGetInTouchContent((prev) => ({
      ...prev,
      title: applyTitlePrefix(prev.title, prefix),
    }));
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
          About
        </button>
        <button
          onClick={() => setActiveTab("getInTouch")}
          className={`px-6 py-3 font-semibold transition ${
            activeTab === "getInTouch"
              ? "border-b-4 border-light text-light"
              : "text-gray-500"
          }`}
        >
          About Intro
        </button>
      </div>

      {/* About Tab */}
      {activeTab === "about" && (
        <div
          className={`p-6 rounded-lg ${
            isDarkMode ? "bg-gray-900" : "bg-gray-50"
          }`}
        >
          <CVEditor />
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
                <h2 className="text-2xl font-bold">About Intro</h2>
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
                Edit About Intro
              </h2>
              <div className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Section Title
                  </label>
                  <div className="mb-3 flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setGetInTouchTitleStyle("")}
                      className={`px-3 py-2 rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-black"
                      }`}
                    >
                      Default
                    </button>
                    <button
                      type="button"
                      onClick={() => setGetInTouchTitleStyle("# ")}
                      className={`px-3 py-2 rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-black"
                      }`}
                    >
                      H1
                    </button>
                    <button
                      type="button"
                      onClick={() => setGetInTouchTitleStyle("## ")}
                      className={`px-3 py-2 rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-black"
                      }`}
                    >
                      H2
                    </button>
                    <button
                      type="button"
                      onClick={() => setGetInTouchTitleStyle("### ")}
                      className={`px-3 py-2 rounded-lg transition ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white"
                          : "bg-gray-200 hover:bg-gray-300 text-black"
                      }`}
                    >
                      H3
                    </button>
                  </div>
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
                  <p className="text-xs text-gray-500 mt-2">
                    This controls the main About page header.
                  </p>
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
                    placeholder="Write your about intro content here..."
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
                    <div className="mb-4">
                      {renderPreviewTitle(editGetInTouchContent.title)}
                    </div>
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

    </div>
  );
};

export default AboutMeEditor;
