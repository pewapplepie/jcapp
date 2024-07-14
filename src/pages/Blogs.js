import React, { useState } from "react";

const BlogPost = ({ title, src, category }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mb-12 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-tertiary mr-2">
          {category}
        </span>
        <h3 className="text-2xl font-semibold text-darkslategray">{title}</h3>
      </div>
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {!loaded && (
          <div className="w-full h-[500px] bg-highlight animate-pulse"></div>
        )}
        <iframe
          src={`${src}/?embed=true`}
          className={`w-full h-[500px] border-0 ${loaded ? "block" : "hidden"}`}
          title={title}
          onLoad={() => setLoaded(true)}
        ></iframe>
      </div>
      <div className="mt-4 text-right">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-primary text-white rounded-md hover:bg-dark transition-colors duration-300"
        >
          Open in new tab
        </a>
      </div>
    </div>
  );
};

const Blogs = () => {
  const blogs = [
    {
      title: "Game of Life Simulator",
      src: "https://pewapplepie-gameoflifesimulator-gameoflifesim-ko6n7q.streamlit.app",
      category: "Simulation",
    },
    {
      title: "Intro Study on Time Series",
      src: "https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app",
      category: "Data Science",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-center text-darkslategray">
        My Blog Posts
      </h2>
      <div className="grid gap-12">
        {blogs.map((blog, index) => (
          <BlogPost key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
