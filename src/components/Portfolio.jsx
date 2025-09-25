import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import animation from "../animations/computerAnimation.json";
import { useRecoilValue } from "recoil";
import { midDeskStateAtom } from "../store/deviceState";
import DeviceState from "./common/DeviceState";
import Landing from "./desktop/landing/Landing";
import Projects from "./desktop/projects/Projects";
import Contact from "./desktop/contact/Contact";
import useSectionNavigation from "../hooks/useSectionNavigation";

const Portfolio = () => {
  const isMidDesk = useRecoilValue(midDeskStateAtom);

  const { currentSectionIndex, navigateToSection } = useSectionNavigation();

  return (
    <DeviceState>
      {isMidDesk ? (
        <div>
          <DotLottiePlayer
            src={animation}
            autoplay
            loop
            speed={0.2}
            className="absolute top-0 left-0 h-[180vh] w-full tablet:w-[140vw] mt-[-35vh] tablet:ml-[-20vw] opacity-10"
          ></DotLottiePlayer>
        </div>
      ) : (
        <>
          <Landing navigateToSection={navigateToSection} />
          <Projects currentSectionIndex={currentSectionIndex} />
          <Contact currentSectionIndex={currentSectionIndex} />
        </>
      )}
    </DeviceState>
  );
};

export default Portfolio;
