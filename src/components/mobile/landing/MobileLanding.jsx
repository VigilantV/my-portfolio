import downloadFile from "../../common/downloadFile";
import classes from "../../../styles/mobile/landing.module.scss";

const MobileLanding = ({ onProjectsClick = () => {} }) => {
  return (
    <div className={classes.hero}>
      <p className={classes.greeting}>Hi, I&apos;m</p>
      <h1 className={classes.name}>Mehrab Gheibi</h1>
      <p className={classes.subtitle}>Full-stack web developer</p>
      <p className={classes.description}>
        Crafting immersive interfaces and performant APIs with a mix of motion
        design, clean architecture, and a passion for delightful user
        experiences.
      </p>
      <div className={classes.ctas}>
        <button
          type="button"
          className={classes.primary_cta}
          onClick={onProjectsClick}
        >
          View Projects
        </button>
        <button
          type="button"
          className={classes.secondary_cta}
          onClick={downloadFile}
        >
          Download Résumé
        </button>
      </div>
      <div className={classes.metrics}>
        <div>
          <p className={classes.metric_value}>05+</p>
          <p className={classes.metric_label}>Years learning</p>
        </div>
        <div>
          <p className={classes.metric_value}>12+</p>
          <p className={classes.metric_label}>Projects shipped</p>
        </div>
        <div>
          <p className={classes.metric_value}>24/7</p>
          <p className={classes.metric_label}>Curiosity</p>
        </div>
      </div>
    </div>
  );
};

export default MobileLanding;

