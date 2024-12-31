import PropTypes from "prop-types";
import PagePic from "../assets/images/page11.png";

const AboutMeContent = ({ className = "" }) => {
  return (
    <section
      className={`w-[90%] overflow-hidden shrink-0 flex flex-col items-start justify-start pt-0 px-0 pb-10 box-border gap-16 max-w-full text-left text-3xl font-inter ${className}`}
    >
      <div className="self-stretch flex flex-col items-center justify-start gap-5 max-w-full">
        <div className="flex flex-row items-center justify-center py-0 pr-5 pl-5 box-border max-w-full font-newsreader">
          <h1 className="m-0 w-full text-5xl leading-tight font-normal text-center">
            Jeffrey Jer-Shen Chen
          </h1>
        </div>
        <h3 className="m-0 w-full text-2xl tracking-wide leading-tight uppercase font-semibold text-center">
          About
        </h3>
        <div className="self-stretch text-xl leading-relaxed">
          <p className="m-0">
            Hi there 👋 I'm Jeffrey, a quantitative researcher and software
            developer from 🇹🇼 and currently locate @ NYC. I recently just
            completed my <b>Marine service</b> at Taiwan Marine Corp, so I guess
            I'm a veteran now. (It was really tough tho, no joke)
            <br />
            I'm passionate about exploring novel ideas and building innovative
            solutions for challenging problems, mostly finance and tech area. I
            enjoy being involved in the end to end process of trading, portfolio
            management and data science research, from initial concept to
            production deployment.
          </p>
          <p className="m-0 pt-8">
            My interest circle around quantitative finance area, including
            <li>
              developing advanced algorithms/optimization and quantitative
              models
            </li>
            <li>
              researching novel machine learning models for financial data and
              large-scale/unstructured data analysis{" "}
            </li>
            <li>
              building alpha generation, statistical arbitrage, and asset
              allocation models.
            </li>
            <li>investing in crypto assets (DeFi&CeFi).</li>
          </p>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-8 max-w-full text-3xl">
        <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-px box-border max-w-full">
          <img
            className="h-[300px] w-full rounded-xl object-cover"
            loading="lazy"
            alt="Profile"
            src={PagePic}
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-3">
          <h3 className="m-0 w-full text-2xl tracking-wide leading-tight uppercase font-semibold text-center">
            Get in Touch
          </h3>
          <div className="self-stretch text-xl leading-relaxed">
            <p className="m-0">
              My recent focus is on building a <b>tech + education startup</b>.
              Still in stealth mode. Will update more in future!
              <b>Exciting!!! </b>
            </p>
            <p className="m-0 pt-4">
              I’d love to collaborate so don’t hesitate to connect with me
              whether it’s a new project or just to share and explore ideas.
            </p>
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
