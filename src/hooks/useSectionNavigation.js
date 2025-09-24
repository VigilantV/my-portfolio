import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const useSectionNavigation = () => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);
  const lastScrollTime = useRef(0);
  const accumulatedDelta = useRef(0);
  const sections = ["landing_section", "projects_section", "contact_section"];

  const navigateToSection = useCallback((index) => {
    // Kill any existing scroll animations
    gsap.killTweensOf(window, "scrollTo");

    setIsNavigating(true);

    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: `#${sections[index]}`, offsetY: 0 },
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSectionIndex(index);
        setIsNavigating(false);
      },
      onInterrupt: () => {
        setIsNavigating(false);
      },
    });
  }, []);

  useEffect(() => {
    const threshold = 100; // Minimum scroll distance to trigger navigation
    const debounceTime = 600; // Minimum time between navigations

    const handleWheel = (e) => {
      // Block all wheel events during navigation
      if (isNavigating) {
        e.preventDefault();
        return;
      }

      const now = Date.now();

      // Block events during debounce period
      if (now - lastScrollTime.current < debounceTime) {
        e.preventDefault();
        return;
      }

      // Accumulate scroll delta
      accumulatedDelta.current += e.deltaY;

      // Check if threshold reached
      if (Math.abs(accumulatedDelta.current) >= threshold) {
        const direction = accumulatedDelta.current > 0 ? 1 : -1;
        const newIndex = Math.max(
          0,
          Math.min(sections.length - 1, currentSectionIndex + direction)
        );

        if (newIndex !== currentSectionIndex) {
          e.preventDefault();
          lastScrollTime.current = now;
          accumulatedDelta.current = 0;
          navigateToSection(newIndex);
        } else {
          accumulatedDelta.current = 0;
          e.preventDefault();
        }
      } else {
        e.preventDefault(); // Prevent normal scrolling while accumulating
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [currentSectionIndex, isNavigating, navigateToSection]);

  // Update current section based on scroll position (for internal state tracking)
  useEffect(() => {
    const updateCurrentSection = () => {
      if (isNavigating) return;

      const scrollY = window.scrollY + window.innerHeight / 2; // Center of viewport

      // Find which section contains the center of the viewport
      for (let i = 0; i < sections.length; i++) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;

          if (scrollY >= elementTop && scrollY < elementBottom) {
            if (i !== currentSectionIndex) {
              setCurrentSectionIndex(i);
            }
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", updateCurrentSection, { passive: true });

    // Initial check
    updateCurrentSection();

    return () => {
      window.removeEventListener("scroll", updateCurrentSection);
    };
  }, [isNavigating, currentSectionIndex]);
};

export default useSectionNavigation;
