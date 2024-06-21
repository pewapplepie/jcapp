import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import profilepic from "../assets/images/image.png";

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
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center w-full relative z-10">
        <div className="w-full h-auto flex flex-row items-start justify-between gap-4">
          <div className="flex flex-col items-start leading-tight">
            <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-blue to-white tracking-tight font-normal">
              <span className="text-4xl">Hi! I’m Jeffrey</span>
              <br />
              <br />
              <span className="animate-linear bg-gradient-to-r from-dark via-pink-500 to-dark bg-[length:200%_auto] bg-clip-text text-6xl font-bold text-transparent">
                A passionate Quant professional
              </span>
              <br />
              <br />
              <span className="text-4xl">Developer + Researcher</span>
            </h1>
          </div>
          <div className="rounded-xl p-2">
            <img
              className="h-[300px] w-[350px] rounded-xl object-cover"
              loading="lazy"
              alt="Profile"
              src={profilepic}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full text-sm font-inter relative z-10">
        <div className="flex flex-col items-center justify-start gap-4">
          <button
            className="cursor-pointer bg-[#262f3f] hover:bg-[blue] text-white text-xl rounded-full py-2 px-6 hover:opacity-75 transition-opacity"
            onClick={onButtonClick}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

Welcome.propTypes = {
  className: PropTypes.string,
};

export default Welcome;
