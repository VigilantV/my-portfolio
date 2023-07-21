import { useState, useRef, useEffect } from "react";

import verticalScrollAnimation from "../../animations/verticalScrollAnimation";
import projectImageAnimation, {
  animation_1,
  animation_2,
  animation_3,
} from "../../animations/projectImageAnimation";
import projects from "../../data files/projects";

import classes from "../../styles/projects.module.scss";

const Projects = () => {
  const [titlesOnShow, setTitlesOnShow] = useState(
    new Array(projects.length).fill(false)
  );
  const [titlesOnHover, setTitlesOnHover] = useState(
    new Array(projects.length).fill(false)
  );

  const [clickedBtnIndex, setClickedBtnIndex] = useState(-1);

  const [image_1, setImage_1] = useState(null);
  const [image_2, setImage_2] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [onHoverLayer, setOnHoverLayer] = useState(false);
  const [isDuringAnimation, setIsDuringAnimation] = useState(false);

  const projectsAnimationRef = useRef(null);

  useEffect(() => {
    let ctx1 = verticalScrollAnimation(projectsAnimationRef, setTitlesOnShow);
    let ctx2 = projectImageAnimation(projectsAnimationRef);
    return () => {
      ctx1.revert();
      ctx2.revert();
    };
  }, []);

  return (
    <div
      id="projects_section"
      ref={projectsAnimationRef}
      className={classes.section}
    >
      <p className={classes.title}>Projects</p>
      <div className={classes.projects}>
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
                    clickedBtnIndex === i ? "0.2vw solid #e31b6d" : null,
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
                      setImage_1(project.img);
                      setImage_2(project.img);
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
        <div className={classes.project_images}>
          <img
            style={{
              visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
            }}
            id="project_img_1"
            src={image_1}
            className={classes.project_img_1}
          />
          <div
            style={{
              visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
              backgroundColor:
                onHoverLayer && !isDuringAnimation ? "#0e0e5299" : null,
            }}
            className={classes.layer_1}
            onMouseEnter={() => {
              setOnHoverLayer(true);
            }}
            onMouseLeave={() => {
              setOnHoverLayer(false);
            }}
          >
            <a
              style={{
                bottom: onHoverLayer && !isDuringAnimation ? "50%" : 0,
                opacity: onHoverLayer && !isDuringAnimation ? 1 : 0,
              }}
              href={websiteUrl}
              className={classes.website_url}
            >
              visit website
            </a>
          </div>
          <img
            style={{
              visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
            }}
            id="project_img_2"
            src={image_2}
            className={classes.project_img_2}
          />
          <div
            style={{
              visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
              backgroundColor:
                onHoverLayer && !isDuringAnimation ? "#0e0e5299" : null,
            }}
            className={classes.layer_2}
            onMouseEnter={() => {
              setOnHoverLayer(true);
            }}
            onMouseLeave={() => {
              setOnHoverLayer(false);
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
