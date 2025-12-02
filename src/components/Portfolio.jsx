import { useLayoutEffect, useState } from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import animation from "../animations/computerAnimation.json";
import useDeviceBreakpoints from "../hooks/useDeviceBreakpoints";
import useSectionNavigation from "../hooks/useSectionNavigation";
import Landing from "./desktop/landing/Landing";
import Projects from "./desktop/projects/Projects";
import Contact from "./desktop/contact/Contact";
import MobilePortfolio from "./mobile/MobilePortfolio";

const Portfolio = () => {
  const { isMidDesk, isTablet, isMobile } = useDeviceBreakpoints();
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(false);

  const { currentSectionIndex, navigateToSection } =
    useSectionNavigation(isNavigationEnabled);

  useLayoutEffect(() => {
    if (typeof document === "undefined") return undefined;
    const previousOverflow = document.body.style.overflowY;
    document.body.style.overflowY = isTablet || isMobile ? "auto" : "hidden";

    return () => {
      document.body.style.overflowY = previousOverflow;
    };
  }, [isTablet, isMobile]);

  if (isTablet || isMobile) {
    return <MobilePortfolio />;
  }

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
