import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import projects from "../data_files/projects";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const PROJECT_IDS = projects.map((_, index) => `project_${index}`);

const verticalScrollAnimation = (animationRef, setTitlesOnShow) => {
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
    let accumulatedScrollDelta = 0;

    const getValidProjectIndex = (index) => {
      return Math.max(0, Math.min(PROJECT_IDS.length - 1, Math.round(index)));
    };

    const navigateToProject = (
      targetIndex,
      skipScroll = false,
      showImages = false
    ) => {
      const validIndex = getValidProjectIndex(targetIndex);

      if (validIndex === currentProjectIndex || isNavigating) {
        return;
      }

      isNavigating = true;
      const previousIndex = currentProjectIndex;
      currentProjectIndex = validIndex;

      // Update title visibility
      setTitlesOnShow(updateTitleVisibility(previousIndex, false));
      setTitlesOnShow(updateTitleVisibility(validIndex, true));

      // For scrolling navigation, scroll to show the title
      if (!skipScroll) {
        // Kill existing animations
        gsap.killTweensOf(projectsSection, "scrollTo");

        // Scroll to show the current title
        gsap.to(projectsSection, {
          duration: 0.3,
          scrollTo: { y: `#${PROJECT_IDS[validIndex]}`, offsetY: 0 },
          ease: "power2.out",
          onComplete: () => {
            isNavigating = false;
          },
          onInterrupt: () => {
            isNavigating = false;
          },
        });
      } else {
        // For click navigation
        if (showImages) {
          setIsDuringAnimation(true);
          setTimeout(() => {
            setIsDuringAnimation(false);
          }, 2200);

          setTimeout(() => {
            const project = projects[validIndex];
            setPrimaryImage(project.primaryImage);
            setSecondaryImage(project.secondaryImage);
            setWebsiteUrl(project.url);
          }, 500);

          if (clickedBtnIndex === -1) {
            setTimeout(() => {
              setClickedBtnIndex(validIndex);
            }, 500);
          } else {
            setClickedBtnIndex(validIndex);
          }
        }
        isNavigating = false;
      }
    };

    // Wheel navigation handler
    const handleWheel = (e) => {
      if (isNavigating) {
        e.preventDefault();
        return;
      }

      // Only handle wheel events within the vertical titles area
      const isInVerticalTitles = e.target.closest("#vertical_titles");
      if (!isInVerticalTitles) return;

      accumulatedScrollDelta += e.deltaY;

      if (Math.abs(accumulatedScrollDelta) >= 30) {
        // Lower threshold for more responsive navigation
        const direction = accumulatedScrollDelta > 0 ? 1 : -1;
        const newIndex = getValidProjectIndex(currentProjectIndex + direction);

        if (newIndex !== currentProjectIndex) {
          e.preventDefault();
          accumulatedScrollDelta = 0;
          navigateToProject(newIndex); // default: skipScroll=false, showImages=false
        } else {
          accumulatedScrollDelta = 0;
        }
      }
    };

    // Set up event listeners
    projectsSection.addEventListener("wheel", handleWheel, { passive: false });

    // Initial setup - show first project
    setTitlesOnShow(updateTitleVisibility(0, true));

    // Set up ScrollTrigger for initial visibility animations only
    projectElements.forEach((project, i) => {
      gsap.to(project, {
        opacity: 1,
        fontSize: "2vw",
        duration: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          scroller: "#vertical_titles",
          trigger: project,
          start: `top bottom-=${(9 * window.innerWidth) / 100}`,
          end: `bottom top+=${(9 * window.innerWidth) / 100}`,
          toggleActions: "play reset play reverse",
          onEnter: () => setTitlesOnShow(updateTitleVisibility(i, true)),
          onLeave: () => setTitlesOnShow(updateTitleVisibility(i, false)),
          onEnterBack: () => setTitlesOnShow(updateTitleVisibility(i, true)),
          onLeaveBack: () => setTitlesOnShow(updateTitleVisibility(i, false)),
        },
      });
    });

    // Return cleanup function from gsap.context
    return () => {
      projectsSection.removeEventListener("wheel", handleWheel);
    };
  }, animationRef);

  return ctx;
};

export default verticalScrollAnimation;
