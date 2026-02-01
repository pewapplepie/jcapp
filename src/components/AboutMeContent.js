import PropTypes from "prop-types";
import PagePic from "../assets/images/page11.png";
import { useAdmin } from "../context/AdminContext";

const AboutMeContent = ({ className = "" }) => {
  const { aboutContent, getInTouchContent } = useAdmin();
  return (
    <section
      className={`w-full flex flex-col items-center justify-start pt-0 px-4 pb-10 box-border gap-16 max-w-full text-left text-3xl font-inter ${className}`}
    >
      <div className="w-full flex flex-col items-center justify-start gap-5 max-w-4xl">
        <div className="flex flex-row items-center justify-center py-0 pr-5 pl-5 box-border w-full font-newsreader">
          <h1 className="m-0 w-full text-5xl leading-tight font-normal text-center">
            Jeffrey Jer-Shen Chen
          </h1>
        </div>
        <h3 className="m-0 w-full text-2xl tracking-wide leading-tight uppercase font-semibold text-center">
          {aboutContent.title}
        </h3>
        <div className="w-full text-xl leading-relaxed whitespace-pre-wrap text-center">
          {aboutContent.content}
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-start gap-8 max-w-4xl text-3xl">
        <div className="w-full flex flex-row items-start justify-center py-0 pr-0 pl-0 box-border max-w-full">
          <img
            className="h-[300px] w-full max-w-2xl rounded-xl object-cover"
            loading="lazy"
            alt="Profile"
            src={PagePic}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-start gap-3">
          <h3 className="m-0 w-full text-2xl tracking-wide leading-tight uppercase font-semibold text-center">
            {getInTouchContent.title}
          </h3>
          <div className="w-full text-xl leading-relaxed whitespace-pre-wrap text-center">
            {getInTouchContent.content}
          </div>
        </div>
      </div>
    </section>
  );
};

AboutMeContent.propTypes = {
  className: PropTypes.string,
};

export default AboutMeContent;
