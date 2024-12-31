import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme, ButtonColors } from "../context/ThemeContext"; // Import the custom hook

import PropTypes from "prop-types";

const Welcome = ({ className = "" }) => {
  const navigate = useNavigate();
  const onButtonClick = useCallback(() => {
    navigate("/about");
  }, [navigate]);
  const { isDarkMode } = useTheme();
  // const bgColor = isDarkMode ? "bg-primary" : "bg-light";
  const button_bg = isDarkMode ? ButtonColors.bg_light : ButtonColors.bg_dark;
  const button_txt = isDarkMode
    ? ButtonColors.txt_dark
    : ButtonColors.txt_light;

  return (
    <div
      className={`relative flex flex-col items-center justify-start gap-4 w-full max-w-full text-left font-newsreader rounded-lg ${className}`}
    >
      {/* <div className="absolute inset-0 z-0">
        <div className="area w-full h-full">
          <ul className="circles">
            {[...Array(10)].map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
      </div> */}
      <div className="flex flex-col items-center w-full relative z-10">
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h1 className="text-center">
            <span className="text-4xl font-semibold">Hi! I'm Jeffrey</span>
            <br />
            <br />
            <span className="text-4xl font-semibold">
              A Quant, Finance & Technology Lover
            </span>
            <br />
            <br />
            <span className="text-4xl text-light font-semibold">
              made of 🐶
            </span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center w-full text-sm font-inter relative z-10 mt-8">
        <button
          className={`cursor-pointer px-5 ${button_bg} ${button_txt} rounded-full border-0 hover:opacity-75 transition-opacity`}
          onClick={onButtonClick}
        >
          <h3>Learn More</h3>
        </button>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  className: PropTypes.string,
};

export default Welcome;
