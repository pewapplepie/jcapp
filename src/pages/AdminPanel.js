import React, { useState } from "react";
import { useAdmin } from "../context/AdminContext";
import { useTheme } from "../context/ThemeContext";
import BlogPostForm from "../components/admin/BlogPostForm";
import AboutMeEditor from "../components/admin/AboutMeEditor";

const AdminPanel = () => {
  const { isAuthenticated, logout, blogs, loading } = useAdmin();
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState("projects");

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}>
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div
      className={`min-h-screen py-12 px-4 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Admin Panel</h1>
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className={`flex gap-1 mb-8 border-b ${
          isDarkMode ? "border-stone-700" : "border-stone-300"
        }`}>
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-3 font-semibold transition rounded-t-md ${
              activeTab === "projects"
                ? isDarkMode
                  ? "border-b-2 border-white text-white bg-stone-800"
                  : "border-b-2 border-stone-900 text-stone-900 bg-stone-100"
                : isDarkMode
                  ? "text-stone-400 hover:text-stone-200"
                  : "text-stone-500 hover:text-stone-700"
            }`}
          >
            Projects ({blogs.length})
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-3 font-semibold transition rounded-t-md ${
              activeTab === "about"
                ? isDarkMode
                  ? "border-b-2 border-white text-white bg-stone-800"
                  : "border-b-2 border-stone-900 text-stone-900 bg-stone-100"
                : isDarkMode
                  ? "text-stone-400 hover:text-stone-200"
                  : "text-stone-500 hover:text-stone-700"
            }`}
          >
            About
          </button>
        </div>

        {/* Content */}
        <div className="bg-opacity-50 rounded-lg">
          {activeTab === "projects" && <BlogPostForm />}
          {activeTab === "about" && <AboutMeEditor />}
        </div>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAdmin();
  const { isDarkMode } = useTheme();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to sign in. Please check your credentials.");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-lg shadow-lg ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition box-border ${
                isDarkMode ? "bg-gray-800 text-white border-gray-700" : "bg-white text-black border-gray-300"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none transition box-border ${
                error ? "border-red-500" : (isDarkMode ? "border-gray-700" : "border-gray-300")
              } ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-light text-black font-semibold rounded-lg hover:opacity-80 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPanel;
