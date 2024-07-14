import React from "react";

const BlogPost = ({ title, src }) => (
  <div className="mb-12 transition-all duration-300 hover:transform hover:scale-105">
    <h3 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h3>
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <iframe
        src={`${src}/?embed=true`}
        className="w-full h-[500px] border-0"
        title={title}
      ></iframe>
    </div>
    <div className="mt-4 text-right">
      <a
        href={src}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
      >
        Open in new tab
      </a>
    </div>
  </div>
);

const Blogs = () => {
  const blogs = [
    {
      title: "Game of Life Simulator",
      src: "https://pewapplepie-gameoflifesimulator-gameoflifesim-ko6n7q.streamlit.app",
    },
    {
      title: "Intro Study on Time Series",
      src: "https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-900">
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
