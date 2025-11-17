import { useEffect, useRef } from "react";

/**
 * Custom hook for managing multiple event listeners with automatic cleanup
 * @param {Array} listeners - Array of listener objects: [{ target, event, handler, options }]
 */
const useEventListeners = (listeners) => {
  const listenersRef = useRef([]);

  useEffect(() => {
    // Store current listeners for cleanup
    listenersRef.current = listeners || [];

    // Add all event listeners
    listenersRef.current.forEach(({ target, event, handler, options }) => {
      if (target && target.addEventListener) {
        target.addEventListener(event, handler, options);
      }
    });

    // Cleanup function
    return () => {
      listenersRef.current.forEach(({ target, event, handler, options }) => {
        if (target && target.removeEventListener) {
          target.removeEventListener(event, handler, options);
        }
      });
      listenersRef.current = [];
    };
  }, [listeners]);
};

export default useEventListeners;
