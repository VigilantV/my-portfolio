import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";

const SECTIONS = ["landing_section", "projects_section", "contact_section"];

const useSectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const currentSectionIndexRef = useRef(0);
  const isNavigating = useRef(false);
  const accumulatedScrollDelta = useRef(0);
  const boundaryTimer = useRef(null);
  const canNavigateFromBoundary = useRef(false);

  const getValidSectionIndex = useCallback((index) => {
    return Math.max(0, Math.min(SECTIONS.length - 1, Math.round(index)));
  }, []);

  const checkBoundaryCondition = useCallback(
    (verticalTitlesElement, deltaY) => {
      if (!verticalTitlesElement) return false;

      const { scrollTop, scrollHeight, clientHeight } = verticalTitlesElement;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      // Check if we're trying to scroll beyond boundaries
      return (isAtTop && deltaY < 0) || (isAtBottom && deltaY > 0);
    },
    []
  );

  const startBoundaryTimer = useCallback(() => {
    if (boundaryTimer.current) {
      clearTimeout(boundaryTimer.current);
    }
    boundaryTimer.current = setTimeout(() => {
      canNavigateFromBoundary.current = true;
    }, 600);
  }, []);

  const cancelBoundaryTimer = useCallback(() => {
    if (boundaryTimer.current) {
      clearTimeout(boundaryTimer.current);
      boundaryTimer.current = null;
    }
    canNavigateFromBoundary.current = false;
  }, []);

  const navigateToSection = useCallback(
    (targetIndex) => {
      const validIndex = getValidSectionIndex(targetIndex);

      if (
        validIndex === currentSectionIndexRef.current ||
        isNavigating.current
      ) {
        return;
      }

      isNavigating.current = true;
      currentSectionIndexRef.current = validIndex;
      setCurrentSectionIndex(validIndex);

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
      const verticalTitlesElement = document.getElementById("vertical_titles");
      const isInVerticalTitles = e.target.closest("#vertical_titles");

      if (isInVerticalTitles && verticalTitlesElement) {
        const isAtBoundary = checkBoundaryCondition(
          verticalTitlesElement,
          e.deltaY
        );

        if (isAtBoundary) {
          if (!boundaryTimer.current) {
            startBoundaryTimer();
          }
          e.preventDefault();
        } else {
          cancelBoundaryTimer();
          return;
        }
      } else {
        cancelBoundaryTimer();
      }

      if (isNavigating.current) {
        e.preventDefault();
        return;
      }

      const allowNavigation =
        !isInVerticalTitles || canNavigateFromBoundary.current;

      if (!allowNavigation) {
        e.preventDefault();
        return;
      }

      accumulatedScrollDelta.current += e.deltaY;

      if (Math.abs(accumulatedScrollDelta.current) >= 100) {
        const direction = accumulatedScrollDelta.current > 0 ? 1 : -1;
        const newIndex = getValidSectionIndex(
          currentSectionIndexRef.current + direction
        );

        if (newIndex !== currentSectionIndexRef.current) {
          e.preventDefault();
          accumulatedScrollDelta.current = 0;
          canNavigateFromBoundary.current = false;
          cancelBoundaryTimer();
          navigateToSection(newIndex);
        } else {
          accumulatedScrollDelta.current = 0;
          e.preventDefault();
        }
      } else {
        e.preventDefault();
      }
    },
    [
      navigateToSection,
      getValidSectionIndex,
      checkBoundaryCondition,
      startBoundaryTimer,
      cancelBoundaryTimer,
    ]
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
          currentSectionIndexRef.current + direction
        );
        if (newIndex !== currentSectionIndexRef.current) {
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
      cancelBoundaryTimer();
    };
  }, [handleWheel, handleKeyDown, cancelBoundaryTimer]);

  return { currentSectionIndex, navigateToSection };
};

export default useSectionNavigation;
