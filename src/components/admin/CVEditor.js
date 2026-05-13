import React, { useState, useRef } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";

const renderPreviewLine = (line, key, isDarkMode) => {
  let content = line;
  const trimmedLine = content.trim();

  if (trimmedLine.startsWith("# ") || trimmedLine.startsWith("## ") || trimmedLine.startsWith("### ")) {
    let headingTag = "h3";

    if (trimmedLine.startsWith("# ")) {
      headingTag = "h1";
    } else if (trimmedLine.startsWith("## ")) {
      headingTag = "h2";
    }

    const headingContent = trimmedLine.replace(/^#{1,3}\s/, "")
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>");

    const headingClasses = {
      h1: "text-3xl font-medium leading-tight font-newsreader",
      h2: "text-2xl font-medium leading-tight font-newsreader",
      h3: "text-xl font-semibold leading-tight",
    };

    return (
      <div
        key={key}
        className={headingClasses[headingTag]}
        dangerouslySetInnerHTML={{ __html: headingContent }}
      />
    );
  }

  const isBullet = content.trim().startsWith("•");
  const tabCount = (content.match(/^\t+/) || [""])[0].length;
  content = content.replace(/^\t+/, "");
  content = content.replace(/^•\s?/, "");
  content = content.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  content = content.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  const style = {
    marginLeft: `${tabCount * 2}rem`,
  };

  return (
    <div key={key} className="flex gap-3" style={style}>
      <span
        className={`mt-2 h-2 w-2 shrink-0 rounded-full ${
          isBullet ? (isDarkMode ? "bg-gray-300" : "bg-gray-500") : "bg-transparent"
        }`}
      />
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

const applyTitlePrefix = (title, prefix) => {
  const cleanTitle = title.replace(/^#{1,3}\s/, "").trimStart();

  if (!prefix) {
    return cleanTitle;
  }

  return `${prefix}${cleanTitle}`;
};

const CVEditor = () => {
  const { cvContent, updateCVContent } = useAdmin();
  const { isDarkMode } = useTheme();
  
  // Ensure cvContent has the correct structure (handle migration from old format)
  const normalizedContent = cvContent?.workExperience ? cvContent : {
    workExperience: {
      title: cvContent?.title || "Work Experience",
      content: cvContent?.content || "Role / Company, Year\nShort context here\n• Key result\n\nNext role / Company, Year\nShort context here",
    },
    education: {
      title: "Education",
      content: "Degree / School, Year\nShort context here",
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

  const setTitleStyle = (prefix) => {
    setFormData((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        title: applyTitlePrefix(prev[activeSection].title, prefix),
      },
    }));
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

  const insertLinePrefix = (prefix) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = formData[activeSection].content;
    const lineStart = currentContent.lastIndexOf("\n", start - 1) + 1;
    const selectedText = currentContent.substring(start, end);
    const beforeText = currentContent.substring(0, lineStart);
    const lineText = currentContent.substring(lineStart, end);
    const afterText = currentContent.substring(end);

    const nextLineText = lineText.startsWith(prefix)
      ? lineText.replace(prefix, "")
      : `${prefix}${lineText || selectedText}`;

    const newText = `${beforeText}${nextLineText}${afterText}`;

    setFormData((prev) => ({
      ...prev,
      [activeSection]: {
        ...prev[activeSection],
        content: newText,
      },
    }));

    setTimeout(() => {
      textarea.focus();
      const newPosition = lineStart + prefix.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      insertMarkdown('\t');
    }
  };

  const renderPreview = (text) => {
    return text
      .split(/\n\s*\n/)
      .map((entry) => entry.split("\n").map((line) => line.trimEnd()))
      .map((lines) => lines.filter((line) => line.trim().length > 0))
      .filter((lines) => lines.length > 0)
      .map(([heading, ...details], idx) => (
        <div key={idx} className="space-y-2 border-b border-current/10 pb-4 last:border-b-0">
          <div className="text-lg font-semibold">
            {renderPreviewLine(heading, `heading-${idx}`, isDarkMode)}
          </div>
          {details.length > 0 && (
            <div className="space-y-2 text-sm opacity-90">
              {details.map((line, detailIdx) =>
                renderPreviewLine(line, `detail-${idx}-${detailIdx}`, isDarkMode)
              )}
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${
        isDarkMode ? 'text-white' : 'text-black'
      }`}>Edit About Page</h2>

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
        <div className="mb-3 flex gap-2 flex-wrap">
          <button
            type="button"
            onClick={() => setTitleStyle("")}
            className={`px-3 py-2 rounded-lg transition ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
            title="Use default section title styling"
          >
            Default
          </button>
          <button
            type="button"
            onClick={() => setTitleStyle("# ")}
            className={`px-3 py-2 rounded-lg transition ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
            title="Format section title as H1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => setTitleStyle("## ")}
            className={`px-3 py-2 rounded-lg transition ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
            title="Format section title as H2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => setTitleStyle("### ")}
            className={`px-3 py-2 rounded-lg transition ${
              isDarkMode
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-gray-200 hover:bg-gray-300 text-black"
            }`}
            title="Format section title as H3"
          >
            H3
          </button>
        </div>
        <input
          type="text"
          name="title"
          value={formData[activeSection].title}
          onChange={handleInputChange}
          className={`box-border w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
        <p className={`mt-2 text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Use Default, H1, H2, or H3 to style the section title without changing its font size.
        </p>
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
          onClick={() => insertLinePrefix("# ")}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-black"
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Format current line as H1"
        >
          H1
        </button>
        <button
          onClick={() => insertLinePrefix("## ")}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-black"
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Format current line as H2"
        >
          H2
        </button>
        <button
          onClick={() => insertLinePrefix("### ")}
          className={`px-4 py-2 rounded-lg transition ${
            isDarkMode
              ? "bg-blue-600 hover:bg-blue-700 text-black"
              : "bg-blue-500 hover:bg-blue-600 text-black"
          }`}
          title="Format current line as H3"
        >
          H3
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
          Tip: separate each role or school with a blank line; use #, ##, or ### for headings
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
          rows="16"
          placeholder="Role / Company, Year\nShort context here\n• Key result\n\nNext role / Company, Year\nShort context here"
          className={`box-border w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none font-mono ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
          }`}
        />
        <p className={`mt-2 text-xs ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Press Enter twice to start a new subsection. Use H1-H3 buttons to set heading level for the current line.
        </p>
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
          <div className="mb-4 border-b border-current/10 pb-3">
            {renderPreviewLine(formData[activeSection].title, "section-title", isDarkMode)}
          </div>
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
