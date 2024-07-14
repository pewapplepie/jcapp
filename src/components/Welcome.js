import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Welcome = ({ className = "" }) => {
  const navigate = useNavigate();
  const onButtonClick = useCallback(() => {
    navigate("/about");
  }, [navigate]);

  return (
    <div
      className={`relative flex flex-col items-center justify-start gap-4 w-full max-w-full text-left text-black font-newsreader rounded-lg ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <div className="area w-full h-full">
          <ul className="circles">
            {[...Array(10)].map((_, index) => (
              <li key={index}></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center w-full relative z-10">
        <div className="w-full h-auto flex flex-col items-center justify-center">
          <h1 className="text-center">
            <span className="text-4xl text-darkslategray font-semibold">
              Hi! I'm Jeffrey
            </span>
            <br />
            <br />
            <span
              className="animate-linear bg-gradient-to-r from-primary via-secondary to-tertiary bg-[length:200%_auto] bg-clip-text text-6xl font-bold text-transparent"
              style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
            >
              A Quant, Finance & Tech lover
            </span>
            <br />
            <br />
            <span className="text-4xl text-darkslategray font-semibold">
              made of 🐶
            </span>
          </h1>
        </div>
      </div>
      <div className="flex justify-center w-full text-sm font-inter relative z-10 mt-8">
        <button
          className="cursor-pointer bg-primary hover:bg-dark text-white text-xl rounded-full py-2 px-6 hover:opacity-75 transition-opacity"
          onClick={onButtonClick}
        >
          Learn More
        </button>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  className: PropTypes.string,
};

export default Welcome;
