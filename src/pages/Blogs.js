import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAdmin } from "../context/AdminContext";

const BlogPost = ({ title, category, tags, description, link }) => {
  const { isDarkMode } = useTheme();
  const isExternalLink = link.startsWith("http");

  return (
    <div
      className={`border-dashed p-6 rounded-lg shadow-lg transition-shadow duration-300 ${
        isDarkMode ? "hover:shadow-gray-700" : "hover:shadow-light"
      }`}
    >
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-sm font-semibold uppercase mb-2">
        Category: <span className="underline">{category}</span>
      </p>
      <div className="flex flex-wrap items-center gap-2 mb-4 font-bold">
        {tags.map((tag, index) => (
          <div
            key={index}
            className={`px-2 py-1 rounded-full text-xs ${
              isDarkMode ? "bg-gray-600" : "bg-darkslategray text-white"
            }`}
          >
            {tag}
          </div>
        ))}
      </div>
      <p className="text-base mb-6">{description}</p>
      {isExternalLink ? (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300"
        >
          Read More
        </a>
      ) : (
        <Link
          to={`/${link}`}
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300"
        >
          Read More
        </Link>
      )}
    </div>
  );
};

const Blogs = () => {
  const { blogs } = useAdmin();
  const { isDarkMode } = useTheme();
  const [sortBy, setSortBy] = useState("newest");

  const getSortedBlogs = () => {
    let sorted = [...blogs];

    switch (sortBy) {
      case "title":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "category":
        sorted.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case "newest":
      default:
        sorted.sort((a, b) => b.id - a.id);
        break;
    }

    return sorted;
  };

  const sortedBlogs = getSortedBlogs();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-4xl font-bold text-center">Projects</h2>

        {/* Sorting Controls */}
        {blogs.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-4">
            <label className="font-semibold">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none cursor-pointer ${
                isDarkMode
                  ? "bg-gray-900 text-white"
                  : "bg-white text-black"
              }`}
            >
              <option value="newest">Newest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="category">Category (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-500 mt-8">No projects yet.</p>
      ) : (
        <div className="grid gap-8 mt-8">
          {sortedBlogs.map((blog) => (
            <BlogPost key={blog.id} {...blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
