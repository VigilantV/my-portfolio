import { useState, useRef } from "react";
import VerticalTitles from "./VerticalTitles";
import ProjectsImages from "./ProjectsImages";
import classes from "../../../styles/desktop/projects.module.scss";

const Projects = () => {
  const [clickedBtnIndex, setClickedBtnIndex] = useState(-1);

  const [primaryImage, setPrimaryImage] = useState(null);
  const [secondaryImage, setSecondaryImage] = useState(null);
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [isDuringAnimation, setIsDuringAnimation] = useState(false);

  const projectsAnimationRef = useRef(null);

  return (
    <div
      id="projects_section"
      ref={projectsAnimationRef}
      className={classes.projects_section}
    >
      <h2 className={classes.title}>Projects</h2>
      <div className={classes.projects}>
        <VerticalTitles
          projectsAnimationRef={projectsAnimationRef}
          clickedBtnIndex={clickedBtnIndex}
          setClickedBtnIndex={setClickedBtnIndex}
          setPrimaryImage={setPrimaryImage}
          setSecondaryImage={setSecondaryImage}
          setWebsiteUrl={setWebsiteUrl}
          setIsDuringAnimation={setIsDuringAnimation}
        />
        <ProjectsImages
          projectsAnimationRef={projectsAnimationRef}
          clickedBtnIndex={clickedBtnIndex}
          primaryImage={primaryImage}
          secondaryImage={secondaryImage}
          websiteUrl={websiteUrl}
          isDuringAnimation={isDuringAnimation}
        />
      </div>
    </div>
  );
};

export default Projects;
