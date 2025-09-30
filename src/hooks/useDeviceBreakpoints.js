import { useEffect, useState } from "react";

const BREAKPOINTS = {
  midDesk: 1381,
  tablet: 1000,
  mobile: 530,
};

const getSnapshot = () => ({
  isMidDesk: window.innerWidth <= BREAKPOINTS.midDesk,
  isTablet: window.innerWidth <= BREAKPOINTS.tablet,
  isMobile: window.innerWidth <= BREAKPOINTS.mobile,
});

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
