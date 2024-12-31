import React from "react";
import { Link } from "react-router-dom"; // Import Link for internal navigation

import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

const BlogPost = ({ title, category, tags, description, link }) => {
  const { isDarkMode } = useTheme(); // Access dark mode state
  const isExternalLink = link.startsWith("http"); // Check if it's an external link

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
      {/* <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`px-4 py-2 rounded-md font-semibold uppercase transition-colors duration-300 inline-flex items-center justify-center ${
          isDarkMode ? "bg-gray-700 text-white" : "bg-darkslategray text-white"
        } hover:opacity-80`}
      >
        Read More
      </a> */}
      {isExternalLink ? (
        // External link using <a>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary transition duration-300"
        >
          Read More
        </a>
      ) : (
        // Internal link using <Link>
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

// export default BlogPost;

// export default Blogs;
const Blogs = () => {
  const blogs = [
    {
      title: "Rusty Game of Life",
      category: "rust",
      tags: ["web-assembly", "rust"],
      description: "Conways game of life",
      link: "rust_gameoflife",
    },
    {
      title: "Conways Game of Life",
      category: "streamlit",
      tags: ["design-pattern", "fluent-api", "streamlit"],
      description: "Conways game of life",
      link: "https://pewapplepie-gameoflifesimulator-gameoflifesim-ko6n7q.streamlit.app",
    },
    {
      title: "Intro Study on Time Series",
      category: "Finance",
      tags: ["time-series", "finance", "data-analysis"],
      description:
        "An introduction to time series analysis in finance. Learn the basics of trends, seasonality, and forecasting methods.",
      link: "https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center ">Projects</h2>
      <div className="grid gap-8">
        {blogs.map((blog, index) => (
          <BlogPost key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
