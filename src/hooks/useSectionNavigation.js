import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

const SECTIONS = ["landing_section", "projects_section", "contact_section"];

const useSectionNavigation = () => {
  const currentSectionIndex = useRef(0);
  const isNavigating = useRef(false);
  const accumulatedScrollDelta = useRef(0);

  const getValidSectionIndex = useCallback((index) => {
    return Math.max(0, Math.min(SECTIONS.length - 1, Math.round(index)));
  }, []);

  const navigateToSection = useCallback(
    (targetIndex) => {
      const validIndex = getValidSectionIndex(targetIndex);

      if (validIndex === currentSectionIndex.current || isNavigating.current) {
        return;
      }

      isNavigating.current = true;
      currentSectionIndex.current = validIndex;

      gsap.killTweensOf(window, "scrollTo");
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: `#${SECTIONS[validIndex]}`, offsetY: 0 },
        ease: "power2.inOut",
        onComplete: () => {
          isNavigating.current = false;
        },
        onInterrupt: () => {
          isNavigating.current = false;
        },
      });
    },
    [getValidSectionIndex]
  );

  const handleWheel = useCallback(
    (e) => {
      if (isNavigating.current) {
        e.preventDefault();
        return;
      }

      accumulatedScrollDelta.current += e.deltaY;

      if (Math.abs(accumulatedScrollDelta.current) >= 100) {
        const direction = accumulatedScrollDelta.current > 0 ? 1 : -1;
        const newIndex = getValidSectionIndex(
          currentSectionIndex.current + direction
        );

        if (newIndex !== currentSectionIndex.current) {
          e.preventDefault();
          accumulatedScrollDelta.current = 0;
          navigateToSection(newIndex);
        } else {
          accumulatedScrollDelta.current = 0;
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    },
    [navigateToSection, getValidSectionIndex]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (isNavigating.current) {
        e.preventDefault();
        return;
      }

      const direction =
        e.key === "ArrowDown" ? 1 : e.key === "ArrowUp" ? -1 : 0;

      if (direction !== 0) {
        const newIndex = getValidSectionIndex(
          currentSectionIndex.current + direction
        );
        if (newIndex !== currentSectionIndex.current) {
          e.preventDefault();
          navigateToSection(newIndex);
        }
      }
    },
    [navigateToSection, getValidSectionIndex]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleWheel, handleKeyDown]);
};

export default useSectionNavigation;
