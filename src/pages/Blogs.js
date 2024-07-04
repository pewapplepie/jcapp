import React from "react";
// https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app/

const Blogs = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">My Blog Posts</h2>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <iframe
          src="https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app/?embed=true"
          className="w-full h-[600px] border-0"
          title="My Streamlit Blog"
        ></iframe>
      </div>
    </div>
  );
};

export default Blogs;
