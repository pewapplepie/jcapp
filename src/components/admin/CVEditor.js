import React, { useState, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";

const CVEditor = () => {
  const { cvContent, updateCVContent } = useAdmin();
  const { isDarkMode } = useTheme();
  
  // Ensure cvContent has the correct structure (handle migration from old format)
  const normalizedContent = cvContent?.workExperience ? cvContent : {
    workExperience: {
      title: cvContent?.title || "Work Experience",
      content: cvContent?.content || "Add your work experience here. Use **bold**, *italic*, • for bullets, and tabs for indentation.",
    },
    education: {
      title: "Education",
      content: "Add your education details here. Use **bold**, *italic*, • for bullets, and tabs for indentation.",
    },
  };
  
  const [formData, setFormData] = useState(normalizedContent);
  const [activeSection, setActiveSection] = useState("workExperience");
  const textareaRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        [name]: value,
      },
    }));
  };

  const handleSave = () => {
    updateCVContent(formData);
    alert("CV content updated successfully!");
  };

  const insertMarkdown = (before, after = "") => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = formData[activeSection].content;
    const selectedText = currentContent.substring(start, end);
    const beforeText = currentContent.substring(0, start);
    const afterText = currentContent.substring(end);

    const newText =
      beforeText + before + selectedText + after + afterText;
    setFormData((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        content: newText,
      },
    }));

    // Move cursor after inserted text
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + before.length + selectedText.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      insertMarkdown('\t');
    }
  };

  // Parse markdown-style formatting for preview
  const renderPreview = (text) => {
    return text
      .split("\n")
      .map((line, idx) => {
        let content = line;
        let isBullet = content.trim().startsWith('•');
        
        // Count leading tabs
        const tabCount = (content.match(/^\t+/) || [''])[0].length;
        content = content.replace(/^\t+/, '');

        // Replace **bold** with actual bold
        content = content.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

        // Replace *italic* with actual italic (but not the bullet •)
        content = content.replace(/\*([^*]+)\*/g, "<em>$1</em>");

        const style = {
          marginLeft: isBullet ? `${tabCount * 2 + 1.5}rem` : `${tabCount * 2}rem`,
          listStyleType: isBullet ? 'disc' : 'none',
          display: isBullet ? 'list-item' : 'block',
        };

        return (
          <div key={idx} style={style} dangerouslySetInnerHTML={{ __html: content }} />
        );
      });
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>Edit CV/Experience</h2>

      {/* Section Tabs */}
      <div className={`flex gap-4 border-b ${
        isDarkMode ? 'border-gray-600' : 'border-gray-300'
      }`}>
        <button
          onClick={() => setActiveSection("workExperience")}
          className={`px-6 py-3 font-semibold transition ${
            activeSection === "workExperience"
              ? "border-b-4 border-blue-500 text-blue-500"
              : isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Work Experience
        </button>
        <button
          onClick={() => setActiveSection("education")}
          className={`px-6 py-3 font-semibold transition ${
            activeSection === "education"
              ? "border-b-4 border-blue-500 text-blue-500"
              : isDarkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Education
        </button>
      </div>

      {/* Title */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>Section Title</label>
        <input
          type="text"
          name="title"
          value={formData[activeSection].title}
          onChange={handleInputChange}
          className={`box-border w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
      </div>

      {/* Formatting Toolbar */}
      <div className="flex gap-2 mb-4 flex-wrap">
        <button
          onClick={() => insertMarkdown("**", "**")}
          className={`px-4 py-2 rounded-lg font-bold transition ${
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-black" 
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Make selected text bold"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => insertMarkdown("*", "*")}
          className={`px-4 py-2 rounded-lg italic transition ${
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-black" 
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Make selected text italic"
        >
          <em>I</em>
        </button>
        <button
          onClick={() => insertMarkdown("• ")}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-black" 
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Add bullet point"
        >
          • Bullet
        </button>
        <button
          onClick={() => insertMarkdown("\t")}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode 
              ? "bg-blue-600 hover:bg-blue-700 text-black" 
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Add indentation (or press Tab)"
        >
          ⇥ Tab
        </button>
        <span className={`text-xs flex items-center ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Tip: Use **bold**, *italic*, • bullets, and Tab key for indentation
        </span>
      </div>

      {/* Content Editor */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>Content</label>
        <textarea
          ref={textareaRef}
          name="content"
          value={formData[activeSection].content}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          rows="12"
          placeholder="Enter content here. Use **bold**, *italic*, • for bullets, press Tab for indentation."
          className={`box-border w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none font-mono ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
      </div>

      {/* Preview */}
      <div>
        <label className={`block text-sm font-semibold mb-2 ${
          isDarkMode ? 'text-white' : 'text-black'
        }`}>Preview</label>
        <div
          className={`w-full px-4 py-3 rounded-lg border-2 border-gray-300 min-h-32 ${
            isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
          }`}
        >
          {renderPreview(formData[activeSection].content)}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold"
        >
          Save All Sections
        </button>
      </div>
    </div>
  );
};

export default CVEditor;
