import React from "react";
import { useTheme } from "../context/ThemeContext";

const NewProjectPage = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen py-10 px-4 flex flex-col items-center ${
      isDarkMode ? "bg-black text-white" : "bg-white text-black"
    }`}>
      <h1 className="text-4xl font-bold mb-6">My New Project</h1>
      <div className="max-w-4xl w-full">
        <p className="text-lg mb-4">
          This is where your new project content goes. You can import components, 
          add interactive elements, or write descriptions here.
        </p>
        <div className={`p-6 rounded-lg border ${
          isDarkMode ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
        }`}>
          <p className="font-mono text-sm">
            Edit src/pages/NewProjectPage.js to start building!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewProjectPage;
