import { useState, useRef, useEffect } from "react";

import IsTyping from "./IsTypingText";
import MyResumeTextBox from "./MyResumeTextBox";
import headerRevealAnimation from "../../animations/headerRevealAnimation";
import dashAnimation from "../../animations/dashAnimation";

import classes from "../../styles/landing.module.scss";
import innerRotating from "../../images/inner_rotating.png";
import outerRotating from "../../images/outer_rotating.png";

const Landing = () => {
  const [showFlame, setShowFlame] = useState(false);
  const [flameDelay, setFlameDelay] = useState(new Array(9).fill(false));

  const [showScrollAnimation, setShowScrollAnimation] = useState(false);

  const [showIsTyping, setShowIsTyping] = useState(true);

  const [isChevronClickable, setIsChevronClickable] = useState(false);

  const landingAnimationRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  document.addEventListener("wheel", () => {
    setShowScrollAnimation(true);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      setShowScrollAnimation(true);
    }
  });

  useEffect(() => {
    const ctx = headerRevealAnimation(landingAnimationRef);
    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (showScrollAnimation) {
      const ctx = dashAnimation(landingAnimationRef);
      setTimeout(() => {
        setIsChevronClickable(true);
      }, 14000);
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
    <div ref={landingAnimationRef}>
      <img className={classes.rotating_inner} src={innerRotating} />
      <img className={classes.rotating_outer} src={outerRotating} />
      <div className={classes.intro}>
        <h4 id="greeting" className={classes.greeting_text}>
          Hi, my name is
        </h4>
        <h1
          id="name"
          onMouseEnter={() => {
            setShowFlame(true);
          }}
          onMouseLeave={() => {
            setShowFlame(false);
          }}
          className={classes.name}
        >
          Mehrab
        </h1>
        <div id="profession" className={classes.profession}>
          <p>A front</p>
          <div id="dash" className={classes.dash}></div>
          <p>end web</p>
          <span style={{ marginRight: "1vw" }}></span>
          <span className={flameDelay[0] ? classes.burn : undefined}>d</span>
          <span className={flameDelay[1] ? classes.burn : undefined}>e</span>
          <span className={flameDelay[2] ? classes.burn : undefined}>v</span>
          <span className={flameDelay[3] ? classes.burn : undefined}>e</span>
          <span className={flameDelay[4] ? classes.burn : undefined}>l</span>
          <span className={flameDelay[5] ? classes.burn : undefined}>o</span>
          <span className={flameDelay[6] ? classes.burn : undefined}>p</span>
          <span className={flameDelay[7] ? classes.burn : undefined}>e</span>
          <span className={flameDelay[8] ? classes.burn : undefined}>r</span>
        </div>
      </div>
      <div id="lazer" className={classes.lazer}></div>
      <div
        id="chevron"
        className={classes.chevron_button}
        onClick={() => {
          if (isChevronClickable) {
            document
              .querySelector(":root")
              .style.setProperty("--scroll-behavior", "scroll");
            document
              .getElementById("projects_section")
              .scrollIntoView({ behavior: "smooth" });
            setTimeout(() => {
              setShowIsTyping(false);
            }, 400);
          }
        }}
      >
        <div className={classes.chevron}></div>
        <div className={classes.chevron}></div>
        <div className={classes.chevron}></div>
      </div>
      {showIsTyping && (
        <IsTyping
          showScrollAnimation={showScrollAnimation}
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
