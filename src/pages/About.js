import { useEffect } from "react";
import AboutMeContent from "../components/AboutMeContent";

const About = () => {
  useEffect(() => {
    const scrollAnimElements = document.querySelectorAll(
      "[data-animate-on-scroll]"
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            const targetElement = entry.target;
            targetElement.classList.add("animate");
            observer.unobserve(targetElement);
          }
        }
      },
      {
        threshold: 0.15,
      }
    );

    scrollAnimElements.forEach((element) => observer.observe(element));

    return () => {
      scrollAnimElements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <div className="w-full relative overflow-hidden flex flex-col items-start justify-start box-border">
      <main className="flex-1 overflow-hidden flex flex-col items-start justify-center pt-9 pb-32 pr-24 pl-24 box-border gap-20 max-w-full">
        <AboutMeContent />
      </main>
    </div>
  );
};

export default About;
