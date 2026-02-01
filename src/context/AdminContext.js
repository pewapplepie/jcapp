import React, { createContext, useState, useContext, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const AdminContext = createContext();

// Default blog data
const DEFAULT_BLOGS = [
  {
    id: 1,
    title: "Intro Study on Time Series",
    category: "Finance",
    tags: ["time-series", "finance", "data-analysis"],
    description:
      "An introduction to time series analysis in finance. Learn the basics of trends, seasonality, and forecasting methods.",
    link: "https://empfinapp-8spcznpsdj8aexevn6etsg.streamlit.app",
  },
  {
    id: 2,
    title: "Conways Game of Life",
    category: "streamlit",
    tags: ["design-pattern", "fluent-api", "streamlit"],
    description: "Conway's game of life simulation built with Streamlit",
    link: "https://pewapplepie-gameoflifesimulator-gameoflifesim-ko6n7q.streamlit.app",
  },
  {
    id: 3,
    title: "Rusty Game of Life",
    category: "rust",
    tags: ["web-assembly", "rust"],
    description: "Conway's game of life implemented in Rust with WebAssembly",
    link: "rust_gameoflife",
  },
];

const DEFAULT_ABOUT_CONTENT = {
  title: "About",
  content: "Add your about me content here. You can edit this from the admin panel.",
};

const DEFAULT_GET_IN_TOUCH = {
  title: "Get in Touch",
  content:
    "My recent focus is on building a tech + education startup. Still in stealth mode. Will update more in future! Exciting!!!\n\nI'd love to collaborate so don't hesitate to connect with me whether it's a new project or just to share and explore ideas.",
};

const DEFAULT_CV_CONTENT = {
  workExperience: {
    title: "Work Experience",
    content: "Add your work experience here. Use **bold**, *italic*, • for bullets, and tabs for indentation.",
  },
  education: {
    title: "Education",
    content: "Add your education details here. Use **bold**, *italic*, • for bullets, and tabs for indentation.",
  },
};

export const AdminProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [aboutContent, setAboutContent] = useState(DEFAULT_ABOUT_CONTENT);
  const [getInTouchContent, setGetInTouchContent] = useState(DEFAULT_GET_IN_TOUCH);
  const [cvContent, setCVContent] = useState(DEFAULT_CV_CONTENT);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Buffer loading state to prevent flash of login screen
  const [authLoading, setAuthLoading] = useState(true);

  // Handle Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Initialize Data from Firestore
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Load blogs
        const blogsSnapshot = await getDocs(collection(db, "blogs"));
        if (blogsSnapshot.empty) {
          // If no blogs in Firebase, add defaults
          for (const blog of DEFAULT_BLOGS) {
            await setDoc(doc(db, "blogs", blog.id.toString()), blog);
          }
          setBlogs(DEFAULT_BLOGS);
        } else {
          const blogsData = blogsSnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: parseInt(doc.id),
          }));
          setBlogs(blogsData);
        }

        // Load about content
        const aboutDoc = await getDocs(collection(db, "content"));
        const aboutData = aboutDoc.docs.find((d) => d.id === "about");
        if (aboutData) {
          setAboutContent(aboutData.data());
        } else {
          await setDoc(doc(db, "content", "about"), DEFAULT_ABOUT_CONTENT);
        }

        // Load get in touch content
        const getInTouchData = aboutDoc.docs.find((d) => d.id === "getInTouch");
        if (getInTouchData) {
          setGetInTouchContent(getInTouchData.data());
        } else {
          await setDoc(doc(db, "content", "getInTouch"), DEFAULT_GET_IN_TOUCH);
        }

        // Load CV content
        const cvData = aboutDoc.docs.find((d) => d.id === "cv");
        if (cvData) {
          setCVContent(cvData.data());
        } else {
          await setDoc(doc(db, "content", "cv"), DEFAULT_CV_CONTENT);
        }
      } catch (error) {
        console.error("Error initializing Firebase data:", error);
        // Fallback to defaults if Firebase fails
        setBlogs(DEFAULT_BLOGS);
        setAboutContent(DEFAULT_ABOUT_CONTENT);
        setGetInTouchContent(DEFAULT_GET_IN_TOUCH);
        setCVContent(DEFAULT_CV_CONTENT);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const addBlog = async (blog) => {
    try {
      const newBlog = {
        ...blog,
        id: Math.max(...blogs.map((b) => b.id), 0) + 1,
      };
      await setDoc(doc(db, "blogs", newBlog.id.toString()), newBlog);
      const updatedBlogs = [...blogs, newBlog];
      setBlogs(updatedBlogs);
      return newBlog;
    } catch (error) {
      console.error("Error adding blog:", error);
      throw error;
    }
  };

  const updateBlog = async (id, updatedBlog) => {
    try {
      await updateDoc(doc(db, "blogs", id.toString()), updatedBlog);
      const updatedBlogs = blogs.map((blog) =>
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error updating blog:", error);
      throw error;
    }
  };

  const deleteBlog = async (id) => {
    try {
      await deleteDoc(doc(db, "blogs", id.toString()));
      const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error("Error deleting blog:", error);
      throw error;
    }
  };

  const updateAboutContent = async (content) => {
    try {
      await setDoc(doc(db, "content", "about"), content);
      setAboutContent(content);
    } catch (error) {
      console.error("Error updating about content:", error);
      throw error;
    }
  };

  const updateGetInTouchContent = async (content) => {
    try {
      await setDoc(doc(db, "content", "getInTouch"), content);
      setGetInTouchContent(content);
    } catch (error) {
      console.error("Error updating get in touch content:", error);
      throw error;
    }
  };

  const updateCVContent = async (content) => {
    try {
      await setDoc(doc(db, "content", "cv"), content);
      setCVContent(content);
    } catch (error) {
      console.error("Error updating CV content:", error);
      throw error;
    }
  };

  return (
    <AdminContext.Provider
      value={{
        blogs,
        aboutContent,
        getInTouchContent,
        cvContent,
        isAuthenticated,
        user,
        loading: loading || authLoading,
        login,
        logout,
        addBlog,
        updateBlog,
        deleteBlog,
        updateAboutContent,
        updateGetInTouchContent,
        updateCVContent,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
};
