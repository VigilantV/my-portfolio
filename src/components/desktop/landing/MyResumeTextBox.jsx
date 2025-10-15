import { useState, useEffect } from "react";
import resumeTextBoxAnimation from "../../../animations/resumeTextBoxAnimation";
import { useGsapAnimation } from "../../../hooks";
import { downloadFile } from "../../common";
import classes from "../../../styles/desktop/landing.module.scss";

const MyResumeTextBox = ({ flameDelay, landingAnimationRef }) => {
  const [showMyResume, setShowMyResume] = useState(false);

  useEffect(() => {
    if (flameDelay) {
      setShowMyResume(true);
    }
  }, [flameDelay]);

  useGsapAnimation(() => {
    if (showMyResume) {
      return resumeTextBoxAnimation(landingAnimationRef);
    }
  }, [showMyResume]);

  return (
    <div id="resume_box" className={classes.resume_box}>
      <div id="talk_box"></div>
      <p id="talk_box_text" onClick={downloadFile}>
        my resume
      </p>
    </div>
  );
};

export default MyResumeTextBox;
