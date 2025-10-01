import { useState, useEffect } from "react";
import verticalScrollAnimation from "../../../animations/verticalScrollAnimation";
import {
  animation_1,
  animation_2,
} from "../../../animations/projectImageAnimation";
import projects from "../../../data_files/projects";
import classes from "../../../styles/desktop/projects.module.scss";
import scrollBar from "../../../styles/scrollbar.module.scss";
import COLORS from "../../../styles/theme";

const VerticalTitles = ({
  projectsAnimationRef,
  clickedBtnIndex,
  setClickedBtnIndex,
  setPrimaryImage,
  setSecondaryImage,
  setWebsiteUrl,
  setIsDuringAnimation,
}) => {
  const [titlesOnShow, setTitlesOnShow] = useState(
    new Array(projects.length).fill(false)
  );
  const [titlesOnHover, setTitlesOnHover] = useState(
    new Array(projects.length).fill(false)
  );

  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);

  const projectsVerticalScrollHandler = () => {
    setCurrentWidth((prevValue) => {
      if (Math.abs(prevValue - window.innerWidth) > 200) {
        return window.innerWidth;
      } else return prevValue;
    });
  };

  useEffect(() => {
    window.addEventListener("resize", projectsVerticalScrollHandler);
    return () => {
      window.removeEventListener("resize", projectsVerticalScrollHandler);
    };
  }, []);

  useEffect(() => {
    const ctx = verticalScrollAnimation(projectsAnimationRef, setTitlesOnShow);
    return () => {
      ctx.revert();
    };
  }, [currentWidth]);

  return (
    <div
      id="vertical_titles"
      style={{ direction: "rtl" }}
      className={`${classes.vertical_titles} ${scrollBar.scrollbar}`}
    >
      <div style={{ direction: "ltr" }}>
        {projects.map((project, i) => (
          <div key={i} id={`project_${i}`} className={classes.project}>
            <h4
              style={{
                display: "inline-block",
                transform:
                  titlesOnHover[i] && titlesOnShow[i]
                    ? "translateX(1.5vw) scale(1.2)"
                    : "translateX(0) scale(1)",
                cursor: titlesOnShow[i] ? "pointer" : null,
                borderLeft:
                  clickedBtnIndex === i
                    ? `0.2vw solid ${COLORS.lightRouge}`
                    : null,
              }}
              className={classes.project_title}
              onMouseEnter={() => {
                setTitlesOnHover((titleState) => ({
                  ...titleState,
                  [i]: true,
                }));
              }}
              onMouseLeave={() => {
                setTitlesOnHover((titleState) => ({
                  ...titleState,
                  [i]: false,
                }));
              }}
              onClick={() => {
                if (titlesOnShow[i] && clickedBtnIndex !== i) {
                  setIsDuringAnimation(true);
                  setTimeout(() => {
                    setIsDuringAnimation(false);
                  }, 2200);

                  (i % 2 === 0 ? animation_1 : animation_2).restart();

                  setTimeout(() => {
                    setPrimaryImage(project.primaryImage);
                    setSecondaryImage(project.secondaryImage);
                    setWebsiteUrl(project.url);
                  }, 500);
                  if (clickedBtnIndex === -1) {
                    setTimeout(() => {
                      setClickedBtnIndex(i);
                    }, 500);
                  } else {
                    setClickedBtnIndex(i);
                  }
                }
              }}
            >
              {project.title}
              {project.period && (
                <p style={{ fontSize: "0.9vw" }}>{project.period}</p>
              )}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalTitles;
