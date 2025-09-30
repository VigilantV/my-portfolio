import { useState, useEffect } from "react";
import projectImageAnimation from "../../../animations/projectImageAnimation";
import COLORS from "../../../styles/theme";
import classes from "../../../styles/desktop/projects.module.scss";

const ProjectsImages = ({
  projectsAnimationRef,
  clickedBtnIndex,
  primaryImage,
  secondaryImage,
  websiteUrl,
  isDuringAnimation,
}) => {
  const [onHoverLayer, setOnHoverLayer] = useState(false);

  useEffect(() => {
    const ctx = projectImageAnimation(projectsAnimationRef);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className={classes.project_images}>
      <img
        style={{
          visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
        }}
        id="primary_image"
        src={primaryImage}
        alt="project primary"
        loading="lazy"
        decoding="async"
        className={classes.primary_image}
      />
      <div
        style={{
          visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
          backgroundColor:
            onHoverLayer && !isDuringAnimation ? COLORS.fadeDarkBlue : null,
        }}
        className={classes.layer_1}
        onMouseEnter={() => {
          setOnHoverLayer(true);
        }}
        onMouseLeave={() => {
          setOnHoverLayer(false);
        }}
      >
        {websiteUrl === "" ? (
          <p
            style={{
              bottom: onHoverLayer && !isDuringAnimation ? "50%" : 0,
              opacity: onHoverLayer && !isDuringAnimation ? 1 : 0,
            }}
            className={classes.website_url}
          >
            visit website
          </p>
        ) : (
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
        )}
      </div>
      <img
        style={{
          visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
        }}
        id="secondary_image"
        src={secondaryImage}
        alt="project secondary"
        loading="lazy"
        decoding="async"
        className={classes.secondary_image}
      />
      <div
        style={{
          visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
          backgroundColor:
            onHoverLayer && !isDuringAnimation ? COLORS.fadeDarkBlue : null,
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
  );
};

export default ProjectsImages;
