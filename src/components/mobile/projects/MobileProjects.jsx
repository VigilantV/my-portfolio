import projects from "../../../data_files/projects";
import classes from "../../../styles/mobile/projects.module.scss";

const MobileProjects = () => {
  const featuredProjects = projects.filter((project) => project.title);

  return (
    <div className={classes.projects}>
      <div className={classes.header}>
        <p className={classes.eyebrow}>Selected work</p>
        <h2 className={classes.title}>Projects</h2>
        <p className={classes.copy}>
          A mix of client work, experiments, and products-in-progress. Built
          with TypeScript, React, Nest, and a sprinkle of GSAP.
        </p>
      </div>
      <div className={classes.card_stack}>
        {featuredProjects.map((project) => (
          <article key={project.title} className={classes.card}>
            <div className={classes.card_media}>
              <img
                src={project.primaryImage}
                alt={project.title}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={classes.card_body}>
              {project.period && (
                <span className={classes.period}>{project.period}</span>
              )}
              <h3>{project.title}</h3>
              <div className={classes.links}>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default MobileProjects;

