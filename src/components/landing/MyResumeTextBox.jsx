import { useState, useEffect } from "react";

import resumeTextBoxAnimation from "../../animations/resumeTextBoxAnimation";

import classes from "../../styles/landing.module.scss";

const MyResumeTextBox = ({ flameDelay, landingAnimationRef }) => {
  const [showMyResume, setShowMyResume] = useState(false);

  useEffect(() => {
    if (flameDelay) {
      setShowMyResume(true);
    }
  }, [flameDelay]);

  useEffect(() => {
    if (showMyResume) {
      let ctx = resumeTextBoxAnimation(landingAnimationRef);
      return () => ctx.revert();
    }
  }, [showMyResume]);

  return (
    <div id="my_resume" className={classes.text_box}>
      <p>my resume</p>
    </div>
  );
};

export default MyResumeTextBox;
