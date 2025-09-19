import { useState, useEffect } from "react";
import resumeTextBoxAnimation from "../../../animations/resumeTextBoxAnimation";
import downloadFile from "../../common/downloadFile";
import classes from "../../../styles/desktop/landing.module.scss";

const MyResumeTextBox = ({ flameDelay, landingAnimationRef }) => {
  const [showMyResume, setShowMyResume] = useState(false);

  useEffect(() => {
    if (flameDelay) {
      setShowMyResume(true);
    }
  }, [flameDelay]);

  useEffect(() => {
    if (showMyResume) {
      const ctx = resumeTextBoxAnimation(landingAnimationRef);
      return () => ctx.revert();
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
