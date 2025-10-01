import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import IsTyping from "./IsTypingText";
import MyResumeTextBox from "./MyResumeTextBox";
import headerRevealAnimation from "../../../animations/headerRevealAnimation";
import dashAnimation from "../../../animations/dashAnimation";
import classes from "../../../styles/desktop/landing.module.scss";
import innerRotating from "../../../images/inner_rotating.png";
import outerRotating from "../../../images/outer_rotating.png";

gsap.registerPlugin(ScrollToPlugin);

const Landing = ({
  navigateToSection,
  currentSectionIndex,
  onNavigationEnabled,
}) => {
  const [showFlame, setShowFlame] = useState(false);
  const [flameDelay, setFlameDelay] = useState(new Array(9).fill(false));
  const [showScrollAnimation, setShowScrollAnimation] = useState(false);

  const [showIsTyping, setShowIsTyping] = useState(false);
  const [hasVisitedAnotherSection, setHasVisitedAnotherSection] =
    useState(false);

  const landingAnimationRef = useRef(null);
  const animationTriggeredRef = useRef(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      window.scrollTo({ top: 0 });
    }, 200);

    const handleUserInteraction = (e) => {
      if (!animationTriggeredRef.current) {
        animationTriggeredRef.current = true;
        setShowScrollAnimation(true);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowDown") handleUserInteraction(e);
    };

    window.addEventListener("wheel", handleUserInteraction);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("wheel", handleUserInteraction);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (currentSectionIndex > 0 && !hasVisitedAnotherSection) {
      setHasVisitedAnotherSection(true);
    }
  }, [currentSectionIndex, hasVisitedAnotherSection]);

  useEffect(() => {
    if (
      hasVisitedAnotherSection &&
      currentSectionIndex === 0 &&
      !showIsTyping
    ) {
      setShowIsTyping(true);
    }
  }, [currentSectionIndex, hasVisitedAnotherSection, showIsTyping]);

  useEffect(() => {
    const ctx = headerRevealAnimation(landingAnimationRef);
    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (showScrollAnimation) {
      const ctx = dashAnimation(landingAnimationRef);
      return () => ctx.revert();
    }
  }, [showScrollAnimation]);

  useEffect(() => {
    let i;
    let turnOn;
    let turnOff;

    if (showFlame) {
      i = -1;
      turnOn = setInterval(() => {
        setFlameDelay((delays) => ({ ...delays, [i]: true }));
        i++;
        if (i === 9) {
          clearInterval(turnOn);
        }
      }, 130);
    } else {
      i = 9;
      turnOff = setInterval(() => {
        setFlameDelay((delays) => ({ ...delays, [i]: false }));
        i--;
        if (i === -1) {
          clearInterval(turnOff);
        }
      }, 90);
    }
    return () => {
      clearInterval(turnOn);
      clearInterval(turnOff);
    };
  }, [showFlame]);

  return (
    <div id="landing_section" ref={landingAnimationRef}>
      <img
        className={classes.rotating_inner}
        src={innerRotating}
        alt="inner-rotating"
      />
      <img
        className={classes.rotating_outer}
        src={outerRotating}
        alt="outer-rotating"
      />
      <div className={classes.landing}>
        <h4 id="greeting" className={classes.greeting_text}>
          Hi, my name is
        </h4>
        <div
          id="name"
          onMouseEnter={() => setShowFlame(true)}
          onMouseLeave={() => setShowFlame(false)}
          className={classes.name}
        >
          <svg
            width="18rem"
            viewBox="-1 10 162 36.5"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              className={classes.name_path}
              d="M2.35 45.30Q1.25 45.30 0.62 44.65Q0 44 0 43.20Q0 42.40 0.20 41.55L6.40 13.20Q6.60 12.30 7.25 11.77Q7.90 11.25 8.85 11.25Q10.60 11.25 11.15 12.95L18.20 35.10L26.20 12.85Q26.80 11.25 28.70 11.25Q29.55 11.25 30.13 11.77Q30.70 12.30 30.90 13.20L37.25 41.50Q37.50 42.65 37.50 43Q37.50 43.95 36.80 44.63Q36.10 45.30 35.05 45.30Q34.05 45.30 33.45 44.77Q32.85 44.25 32.65 43.40L28.05 22.50L20.35 43.70Q20.10 44.45 19.45 44.88Q18.80 45.30 18.00 45.30Q16.25 45.30 15.70 43.60L9.20 23.25L4.80 43.35Q4.60 44.25 3.95 44.77Q3.30 45.30 2.35 45.30ZM53.20 45.30Q49.65 45.30 46.83 43.77Q44.00 42.25 42.40 39.42Q40.80 36.60 40.80 32.75Q40.80 29.60 42.23 26.72Q43.65 23.85 46.23 22.10Q48.80 20.35 52.10 20.35Q55.15 20.35 57.33 21.57Q59.50 22.80 60.60 24.50Q61.70 26.20 61.70 27.55Q61.70 28.20 61.30 28.80Q60.90 29.40 60.15 29.85L46.75 37.55Q47.45 39.10 49.23 39.95Q51.00 40.80 53.20 40.80Q56.10 40.80 58.15 38.65Q58.95 37.85 59.80 37.85Q60.80 37.85 61.48 38.50Q62.15 39.15 62.15 40.10Q62.15 40.90 61.55 41.60Q60.15 43.15 57.83 44.23Q55.50 45.30 53.20 45.30M56.75 26.95Q56.15 25.90 55.05 25.38Q53.95 24.85 52.45 24.85Q49.60 24.85 47.68 26.80Q45.75 28.75 45.45 31.60Q45.35 32.35 45.35 33.40L56.75 26.95ZM69.35 45.35Q68.40 45.35 67.67 44.63Q66.95 43.90 66.95 42.95L66.95 14.15Q66.95 13.15 67.67 12.42Q68.40 11.70 69.45 11.70Q70.45 11.70 71.10 12.42Q71.75 13.15 71.75 14.15L71.75 24.90Q73.40 22.80 75.50 21.52Q77.60 20.25 79.70 20.25Q83.65 20.25 85.25 24.22Q86.85 28.20 86.85 36.80Q86.85 41.65 86.70 43.05Q86.65 44 85.98 44.65Q85.30 45.30 84.35 45.30Q83.30 45.30 82.65 44.63Q82 43.95 82 42.95Q82 41.95 82.05 41.30L82.10 37.15Q82.10 29.90 81.33 27.45Q80.55 25 79.40 25Q77.95 25 76.45 26.32Q74.95 27.65 73.88 29.27Q72.80 30.90 72.35 31.85Q71.75 33.20 71.75 35.40L71.75 42.85Q71.75 44 71.05 44.67Q70.35 45.35 69.35 45.35ZM95.80 45.30Q94.85 45.30 94.10 44.60Q93.35 43.90 93.35 43L93.35 22.75Q93.35 21.75 94.08 21.05Q94.80 20.35 95.80 20.35Q96.80 20.35 97.53 21.05Q98.25 21.75 98.25 22.75L98.25 24.25Q100.70 20.25 104.95 20.25Q107.50 20.25 108.63 21.65Q109.75 23.05 109.75 25L109.75 26.50Q109.75 27.50 109.08 28.18Q108.40 28.85 107.40 28.85Q106.20 28.85 105.63 28.15Q105.05 27.45 105.05 26.45L105.05 25.80Q105.05 25 103.95 25Q103.05 25 101.88 25.90Q100.70 26.80 99.95 27.80Q98.90 29.10 98.58 30.40Q98.25 31.70 98.25 33.50L98.20 43Q98.20 43.90 97.45 44.60Q96.70 45.30 95.80 45.30ZM129.50 45.80Q128.50 45.80 127.88 45.25Q127.25 44.70 127.25 43.80L127.25 43.10Q125.20 45.30 121.55 45.30Q118.80 45.30 116.60 43.95Q114.40 42.60 113.15 40.13Q111.90 37.65 111.90 34.50Q111.90 31 113.40 27.72Q114.90 24.45 117.63 22.40Q120.35 20.35 123.90 20.35Q126.20 20.35 128.05 20.97Q129.90 21.60 131.90 22.50L131.90 43.30Q131.90 44.30 131.20 45.05Q130.50 45.80 129.50 45.80M121.90 40.65Q123.35 40.65 124.73 40.05Q126.10 39.45 127.00 38.60L127.15 25.55Q125.70 24.95 124.00 24.95Q121.85 24.95 120.20 26.27Q118.55 27.60 117.65 29.77Q116.75 31.95 116.75 34.40Q116.75 37.45 118.10 39.05Q119.45 40.65 121.90 40.65ZM141.20 45.25Q140.20 45.25 139.55 44.60Q138.90 43.95 138.90 43L138.90 13.95Q138.90 12.95 139.60 12.32Q140.30 11.70 141.30 11.70Q142.25 11.70 142.95 12.32Q143.65 12.95 143.65 13.95L143.65 23.75Q145.10 22.15 146.85 21.45Q148.60 20.75 150.70 20.75Q153.20 20.75 155.25 22.02Q157.30 23.30 158.53 25.80Q159.75 28.30 159.75 31.85Q159.75 38.25 156.80 41.63Q153.85 45 148.75 45Q147.35 45 145.78 44.52Q144.20 44.05 143.35 43.45L143.35 43.75Q143.35 44.25 142.72 44.75Q142.10 45.25 141.20 45.25M148.40 40.30Q151.90 40.30 153.47 38.10Q155.05 35.90 155.05 31.85Q155.05 28.75 153.85 27.15Q152.65 25.55 150.60 25.55Q148.70 25.55 147.10 26.25Q145.50 26.95 144.58 28.15Q143.65 29.35 143.65 30.80L143.65 39.45Q146.20 40.30 148.40 40.30Z"
            />
          </svg>
        </div>
        <div id="profession" className={classes.profession}>
          <p>A full</p>
          <div id="dash" className={classes.dash}></div>
          <p style={{ marginRight: "1vw" }}>stack web</p>
          <span className={flameDelay[0] ? classes.burn : undefined}>d</span>
          <span
            className={
              flameDelay[0] && flameDelay[1] ? classes.burn : undefined
            }
          >
            e
          </span>
          <span
            className={
              flameDelay[1] && flameDelay[2] ? classes.burn : undefined
            }
          >
            v
          </span>
          <span
            className={
              flameDelay[2] && flameDelay[3] ? classes.burn : undefined
            }
          >
            e
          </span>
          <span
            className={
              flameDelay[3] && flameDelay[4] ? classes.burn : undefined
            }
          >
            l
          </span>
          <span
            className={
              flameDelay[4] && flameDelay[5] ? classes.burn : undefined
            }
          >
            o
          </span>
          <span
            className={
              flameDelay[5] && flameDelay[6] ? classes.burn : undefined
            }
          >
            p
          </span>
          <span
            className={
              flameDelay[6] && flameDelay[7] ? classes.burn : undefined
            }
          >
            e
          </span>
          <span
            className={
              flameDelay[7] && flameDelay[8] ? classes.burn : undefined
            }
          >
            r
          </span>
        </div>
      </div>
      <div
        id="chevron"
        className={classes.chevron_button}
        onClick={() => {
          onNavigationEnabled(true);
          navigateToSection(1);
        }}
      >
        <div className={classes.chevron_arrow}></div>
        <div className={classes.chevron_arrow}></div>
        <div className={classes.chevron_arrow}></div>
      </div>
      {showIsTyping && (
        <IsTyping
          showScrollAnimation={true}
          landingAnimationRef={landingAnimationRef}
        />
      )}
      <MyResumeTextBox
        flameDelay={flameDelay[8]}
        landingAnimationRef={landingAnimationRef}
      />
    </div>
  );
};

export default Landing;
