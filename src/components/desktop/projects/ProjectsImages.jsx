import { useState } from "react";
import projectImageAnimation from "../../../animations/projectImageAnimation";
import useGsapAnimation from "../../../hooks/useGsapAnimation";
import COLORS from "../../../styles/theme";
import classes from "../../../styles/desktop/projects.module.scss";
import globeIcon from "../../../images/icons/globe.png";
import githubIcon from "../../../images/icons/github_rouge.png";

const ProjectsImages = ({
  projectsAnimationRef,
  clickedBtnIndex,
  primaryImage,
  secondaryImage,
  websiteUrl,
  githubUrl,
  isDuringAnimation,
}) => {
  const [onHoverLayer, setOnHoverLayer] = useState(false);
  const hasWebsiteUrl = Boolean(websiteUrl?.trim());
  const hasGithubUrl = Boolean(githubUrl?.trim());
  const sharedIconStyle = {
    opacity: onHoverLayer && !isDuringAnimation ? 1 : 0,
  };

  useGsapAnimation(() => projectImageAnimation(projectsAnimationRef));

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
      {(hasWebsiteUrl || hasGithubUrl) && (
        <div
          style={{
            visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
            backgroundColor:
              onHoverLayer && !isDuringAnimation ? COLORS.fadeDarkBlue : null,
          }}
          className={classes.layer_1}
          onMouseOver={() => {
            setOnHoverLayer(true);
          }}
          onMouseLeave={() => {
            setOnHoverLayer(false);
          }}
        >
          {hasWebsiteUrl && (
            <div
              style={{
                bottom: onHoverLayer && !isDuringAnimation ? "50%" : 0,
                left: hasWebsiteUrl && !hasGithubUrl ? "50%" : "45%",
                transform:
                  hasWebsiteUrl && !hasGithubUrl ? "translateX(-50%)" : "none",
              }}
              className={classes.icon_container}
            >
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                {hasWebsiteUrl && !hasGithubUrl ? (
                  <span className={classes.link_text} style={sharedIconStyle}>
                    Visit Website
                  </span>
                ) : (
                  <img
                    style={sharedIconStyle}
                    src={globeIcon}
                    alt="website_url"
                  />
                )}
              </a>
            </div>
          )}
          {hasGithubUrl && (
            <div
              style={{
                bottom: onHoverLayer && !isDuringAnimation ? "50%" : 0,
                left: hasGithubUrl && !hasWebsiteUrl ? "50%" : "55%",
                transform:
                  hasGithubUrl && !hasWebsiteUrl ? "translateX(-50%)" : "none",
              }}
              className={classes.icon_container}
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                {hasGithubUrl && !hasWebsiteUrl ? (
                  <span className={classes.link_text} style={sharedIconStyle}>
                    Visit Github
                  </span>
                ) : (
                  <img
                    style={sharedIconStyle}
                    src={githubIcon}
                    alt="github_url"
                  />
                )}
              </a>
            </div>
          )}
        </div>
      )}
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
      {(hasWebsiteUrl || hasGithubUrl) && (
        <div
          style={{
            visibility: clickedBtnIndex === -1 ? "hidden" : "visible",
            backgroundColor:
              onHoverLayer && !isDuringAnimation ? COLORS.fadeDarkBlue : null,
          }}
          className={classes.layer_2}
          onMouseOver={() => {
            setOnHoverLayer(true);
          }}
          onMouseLeave={() => {
            setOnHoverLayer(false);
          }}
        ></div>
      )}
    </div>
  );
};

export default ProjectsImages;
