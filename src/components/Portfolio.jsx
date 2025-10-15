import { useState } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import animation from "../animations/computerAnimation.json";
import { useDeviceBreakpoints, useSectionNavigation } from "../hooks";
import Landing from "./desktop/landing/Landing";
import Projects from "./desktop/projects/Projects";
import Contact from "./desktop/contact/Contact";

const Portfolio = () => {
  const { isMidDesk } = useDeviceBreakpoints();
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);

  const { currentSectionIndex, navigateToSection } =
    useSectionNavigation(isNavigationEnabled);

  return isMidDesk ? (
    <div>
      <DotLottiePlayer
        src={animation}
        autoplay
        loop
        speed={0.2}
        className="absolute top-0 left-0 h-[180vh] w-full tablet:w-[140vw] mt-[-35vh] tablet:ml-[-20vw] opacity-10"
      />
    </div>
  ) : (
    <>
      <Landing
        navigateToSection={navigateToSection}
        currentSectionIndex={currentSectionIndex}
        onNavigationEnabled={setIsNavigationEnabled}
      />
      <Projects
        currentSectionIndex={currentSectionIndex}
        navigateToSection={navigateToSection}
      />
      <Contact currentSectionIndex={currentSectionIndex} />
    </>
  );
};

export default Portfolio;
