import { useState, useEffect } from "react";

import verticalScrollAnimation from "../../animations/verticalScrollAnimation";
import {
  animation_1,
  animation_2,
  animation_3,
} from "../../animations/projectImageAnimation";
import projects from "../../data files/projects";

import classes from "../../styles/projects.module.scss";

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
    if (Math.abs(currentWidth - window.innerWidth) > 300) {
      setCurrentWidth(window.innerWidth);
    }
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
    <div id="vertical_titles" className={classes.vertical_titles}>
      {projects.map((project, i) => (
        <div key={i} id="project" className={classes.project}>
          <h4
            style={{
              transform:
                titlesOnHover[i] && titlesOnShow[i]
                  ? "translateX(1.5vw) scale(1.2)"
                  : "translateX(0) scale(1)",
              cursor: titlesOnShow[i] ? "pointer" : null,
              borderLeft:
                clickedBtnIndex === i
                  ? `0.2vw solid ${window.lightRouge}`
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
                }, 1600);

                [animation_1, animation_2, animation_3][
                  Math.floor(Math.random() * 3)
                ].restart();

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
          </h4>
        </div>
      ))}
    </div>
  );
};

export default VerticalTitles;
