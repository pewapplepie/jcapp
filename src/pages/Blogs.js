import React, { useState } from "react";

const BlogPost = ({ title, src, category }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="mb-12 hover:scale-101">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-tertiary mr-2">
          {category}
        </span>
        <h3 className="text-2xl font-semibold">{title}</h3>
      </div>
      <div className="rounded-xl ">
        {!loaded && <div className="w-full h-[500px] "></div>}
        <iframe
          src={`${src}/?embed=true`}
          className="w-full "
          title={title}
          onLoad={() => setLoaded(true)}
        ></iframe>
      </div>
      <div className="mt-4 text-right">
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 rounded-md"
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
      <h2 className="text-4xl font-bold mb-8 text-center">My Stuff</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        {blogs.map((blog, index) => (
          <BlogPost key={index} {...blog} />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
