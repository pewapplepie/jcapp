import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import { useTheme } from "../../context/ThemeContext";

const BlogPostForm = () => {
  const { blogs, addBlog, updateBlog, deleteBlog } = useAdmin();
  const { isDarkMode } = useTheme();
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    tags: [],
    description: "",
    link: "",
  });
  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.category ||
      !formData.description ||
      !formData.link
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingId) {
      updateBlog(editingId, formData);
      setEditingId(null);
    } else {
      addBlog(formData);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      tags: [],
      description: "",
      link: "",
    });
    setTagInput("");
  };

  const handleEdit = (blog) => {
    setFormData(blog);
    setEditingId(blog.id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      deleteBlog(id);
    }
  };

  const handleCancel = () => {
    resetForm();
    setEditingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div
        className={`p-6 rounded-lg ${
          isDarkMode ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6">
          {editingId ? "Edit Blog Post" : "Add New Blog Post"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Blog post title"
                className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none box-border ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="e.g., rust, finance, data-science"
                className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none box-border ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold mb-2">Tags</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                placeholder="Add tag and press Enter"
                className={`flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none box-border ${
                  isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                }`}
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-4 py-2 bg-light text-black rounded-lg font-semibold hover:opacity-80"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-light text-black rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:opacity-70"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Write a description"
              rows="4"
              className={`w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none box-border ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-semibold mb-2">Link *</label>
            <input
              type="text"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              placeholder="Internal route (e.g., rust_gameoflife) or external URL"
              className={`box-border w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-end pt-4">
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              {editingId ? "Update" : "Add"} Blog Post
            </button>
          </div>
        </form>
      </div>

      {/* Blog List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Blog Posts ({blogs.length})
        </h2>
        <div className="space-y-4">
          {blogs.length === 0 ? (
            <p className="text-gray-500">No blog posts yet. Create one!</p>
          ) : (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className={`p-4 rounded-lg border-2 ${
                  isDarkMode
                    ? "bg-gray-900 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold">{blog.title}</h3>
                    <p className="text-sm text-gray-500">
                      Category: {blog.category}
                    </p>
                    <p className="text-sm mt-2">{blog.description}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {blog.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`text-xs px-2 py-1 rounded ${
                            isDarkMode
                              ? "bg-gray-700 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPostForm;
