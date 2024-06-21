import PropTypes from "prop-types";

const Experience = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start gap-12 max-w-full shrink-0 text-left text-9xl text-black font-inter p-8 rounded-lg ${className}`}
    >
      <div className="w-full flex flex-col items-start justify-start">
        <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px">
          <h2 className="m-0 relative text-inherit tracking-wide leading-tight uppercase font-semibold font-inherit text-3xl leading-9">
            WORK EXPERIENCE
          </h2>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-8 mt-8">
          <div className="flex flex-col items-start justify-start py-0 pr-0 pl-px gap-2">
            <div>
              <p className="m-0 text-xl"><b>Marine</b> @ Taiwan Marine Corp (Compulsory)</p>
              <p className="m-0 text-base">Oct 2023 - Apr 2024</p>
            </div>
            <div>
              <p className="m-0 text-xl">Portfolio Algo Engineer, Associate <b>@ BlackRock</b></p>
              <p className="m-0 text-base">Feb 2022 - Jun 2023</p>
            </div>
            <div>
              <p className="m-0 text-xl">UCLA Joint Researcher <b>@ Western Asset Management</b></p>
              <p className="m-0 text-base">Apr 2021 - Dec 2021</p>
            </div>
            <div>
              <p className="m-0 text-xl">Derivative Strats <b>@ Cboe Global Markets</b></p>
              <p className="m-0 text-base">Jun 2021 - Aug 2021</p>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px mt-12">
          <h2 className="m-0 relative text-inherit tracking-wide leading-tight uppercase font-semibold font-inherit text-3xl leading-9">
            EDUCATION
          </h2>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-8 mt-8">
          <div>
            <p className="m-0 text-xl">Master of Financial Engineering <b>@ UCLA</b></p>
            <ul className="m-0 font-inherit text-inherit pl-7">
              <li className="mb-0 text-base">Relevant coursework: Algo Trading, Quant Research</li>
              <li className="mb-0 text-base">Thesis: Machine Learning in Finance</li>
            </ul>
          </div>
          <div>
            <p className="m-0 text-xl">Graduate Certificate of Machine Learning <b>@ Cornell</b></p>
            <ul className="m-0 font-inherit text-inherit pl-7">
              <li className="mb-0 text-base">Deep dive into various Machine Learning models and implement them from scratch </li>
            </ul>
          </div>
          <div>
            <p className="m-0 text-xl">Bachelor of Science, Chemistry <b>@ NTU</b></p>
            <ul className="m-0 font-inherit text-inherit pl-7">
              <li className="mb-0 text-base">Analytical Chemistry Lab Researcher @ Dr. Hsu Cheng-Chi</li>
              <li className="mb-0 text-base">Thesis: Analytical Techniques in Chemistry</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

Experience.propTypes = {
  className: PropTypes.string,
};

export default Experience;
