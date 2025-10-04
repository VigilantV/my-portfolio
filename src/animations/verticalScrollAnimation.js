import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import projects from "../data_files/projects";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PROJECT_IDS = projects.map((_, index) => `project_${index}`);

const verticalScrollAnimation = (
  animationRef,
  setTitlesOnShow,
  navigateToSection
) => {
  const ctx = gsap.context(() => {
    const projectsSection = document.getElementById("vertical_titles");
    const projectElements = PROJECT_IDS.map((id) =>
      document.getElementById(id)
    );

    const updateTitleVisibility = (index, visible) => (prev) => ({
      ...prev,
      [index]: visible,
    });

    let currentProjectIndex = 0;
    let isNavigating = false;
    const navigateTitles = (targetIndex) => {
      if (isNavigating) return;

      if (targetIndex < 0) {
        navigateToSection(0);
        return;
      } else if (targetIndex > PROJECT_IDS.length - 1 - 4) {
        navigateToSection(2);
        return;
      }

      isNavigating = true;
      currentProjectIndex = targetIndex;

      // Update ScrollTrigger start/end positions based on new currentProjectIndex
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.scroller === "#vertical_titles") {
          const triggerIndex = projectElements.findIndex(
            (el) => el === trigger.vars.trigger
          );
          if (triggerIndex !== -1) {
            trigger.vars.start = `top bottom-=${
              ((currentProjectIndex === 0 ? 12 : 9) * window.innerWidth) / 100
            }`;
            trigger.vars.end = `bottom top+=${
              ((currentProjectIndex === 0 ? 0 : 9) * window.innerWidth) / 100
            }`;
            trigger.refresh();
          }
        }
      });

      gsap.killTweensOf(projectsSection, "scrollTo");

      gsap.to(projectsSection, {
        duration: 0.3,
        scrollTo: { y: `#${PROJECT_IDS[targetIndex]}` },
        ease: "power2.out",
        onComplete: () => (isNavigating = false),
      });
    };

    const handleWheel = (e) => {
      const direction = e.deltaY > 0 ? 1 : -1;
      navigateTitles(currentProjectIndex + direction);
    };

    projectElements.forEach((project, i) => {
      gsap.to(project, {
        opacity: 1,
        fontSize: "2vw",
        duration: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          scroller: "#vertical_titles",
          trigger: project,
          start: `top bottom-=${
            ((currentProjectIndex === 0 ? 12 : 9) * window.innerWidth) / 100
          }`,
          end: `bottom top+=${
            ((currentProjectIndex === 0 ? 0 : 9) * window.innerWidth) / 100
          }`,
          toggleActions: "play reset play reverse",
          onEnter: () => setTitlesOnShow(updateTitleVisibility(i, true)),
          onLeave: () => setTitlesOnShow(updateTitleVisibility(i, false)),
          onEnterBack: () => setTitlesOnShow(updateTitleVisibility(i, true)),
          onLeaveBack: () => setTitlesOnShow(updateTitleVisibility(i, false)),
        },
      });
    });

    projectsSection.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      projectsSection.removeEventListener("wheel", handleWheel);
    };
  }, animationRef);

  return ctx;
};

export default verticalScrollAnimation;
