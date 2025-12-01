import { useEffect, useState } from "react";

const BREAKPOINTS = {
  midDeskWidth: 1381,
  tablet: 1000,
  mobile: 530,
};

const DESKTOP_RATIO = BREAKPOINTS.midDeskWidth / 620;

const getSnapshot = () => {
  if (typeof window === "undefined") {
    return {
      isMidDesk: false,
      isTablet: false,
      isMobile: false,
    };
  }

  const width = window.innerWidth;
  const height = Math.max(window.innerHeight, 1);
  const aspectRatio = width / height;

  return {
    isMidDesk: width <= BREAKPOINTS.midDeskWidth || aspectRatio < DESKTOP_RATIO,
    isTablet: width <= BREAKPOINTS.tablet,
    isMobile: width <= BREAKPOINTS.mobile,
  };
};

const useDeviceBreakpoints = () => {
  const [state, setState] = useState(getSnapshot);

  useEffect(() => {
    let rafId = null;
    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setState(getSnapshot()));
    };
    window.addEventListener("resize", onResize);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return state;
};

export default useDeviceBreakpoints;
