import { useEffect, useRef } from "react";

/**
 * Reusable hook for GSAP animations with automatic cleanup
 * @param {Function} animationFn - Function that receives ref and returns a GSAP context (can return undefined for conditional animations)
 * @param {Array} deps - Dependencies array for useEffect
 * @returns {Object} - Ref to pass to animation function
 */
const useGsapAnimation = (animationFn, deps = []) => {
  const animationRef = useRef(null);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (ctxRef.current && typeof ctxRef.current.revert === "function") {
      ctxRef.current.revert();
      ctxRef.current = null;
    }

    if (animationFn && typeof animationFn === "function") {
      const ctx = animationFn(animationRef);
      if (ctx) {
        ctxRef.current = ctx;
      }
    }

    return () => {
      if (ctxRef.current && typeof ctxRef.current.revert === "function") {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, deps);

  return animationRef;
};

export default useGsapAnimation;
