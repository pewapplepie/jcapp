import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import linkedinIcon from "../assets/images/linkedinrect.svg";
import githubIcon from "../assets/images/github.svg";
import instagramIcon from "../assets/images/instagramfilled.svg";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const location = useLocation();
  const { isDarkMode, toggleMode } = useTheme();

  const isActive = (path) => location.pathname === path;
  const txtColor = isDarkMode ? "text-white" : "text-black";

  return (
    <header className="w-full flex flex-row items-start justify-between mt-4 mb-10 pt-4 px-8 pb-4 box-border gap-4 text-left text-base">
      <div className="flex flex-row items-center justify-start space-x-4 cursor-pointer">
        <Link
          to="/"
          className={` ${
            location.pathname === "/" ? "text-light" : txtColor
          } flex text-3xl font-bold no-underline`}
        >
          jeffreychen.me
        </Link>

        <button
          className={`w-6 h-6 items-center justify-center rounded-full transition-all ${
            isDarkMode ? "bg-light text-black" : "bg-light text-white"
          } font-bold hover:scale-110 focus:outline-none border-0 cursor-pointer`}
          onClick={toggleMode}
        >
          <span className="hover:scale-110 center-align">
            {" "}
            {isDarkMode ? "D" : "L"}
          </span>
        </button>
      </div>
      <div className="flex flex-row items-center justify-start gap-10 text-center">
        {/* About Me Link */}
        <div className="flex flex-col items-center justify-start pt-2">
          <Link
            to="/about"
            className={`relative leading-[21px] inline-block cursor-pointer text-xl text-light ${
              isActive("/about")
                ? "font-bold underline decoration-3"
                : "no-underline"
            }`}
          >
            About Me
          </Link>
        </div>

        {/* Blogs Link */}
        <div className="flex flex-col items-center justify-start pt-2">
          <Link
            to="/blogs"
            className={`relative leading-[21px] inline-block cursor-pointer text-xl text-light ${
              isActive("/blogs")
                ? "font-bold underline decoration-3"
                : "no-underline"
            }`}
          >
            Stuff
          </Link>
        </div>

        {/* Social Media Icons */}
        <div className="flex flex-row items-center gap-2">
          <img
            className="h-5 w-5 cursor-pointer"
            loading="lazy"
            alt="LinkedIn"
            src={linkedinIcon}
            onClick={() =>
              (window.location.href =
                "https://www.linkedin.com/in/jeffrey-chen-537155173/")
            }
          />
          <img
            className="h-5 w-5 cursor-pointer"
            loading="lazy"
            alt="GitHub"
            src={githubIcon}
            onClick={() =>
              (window.location.href = "https://github.com/pewapplepie")
            }
          />
          <img
            className="h-5 w-5 cursor-pointer"
            loading="lazy"
            alt="Instagram"
            src={instagramIcon}
            onClick={() =>
              (window.location.href =
                "https://www.instagram.com/mortyismaltipoo?utm_source=qr")
            }
          />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  jeffreychenhaColor: PropTypes.string,
};

export default Header;
