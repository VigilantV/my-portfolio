const reportWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import("web-vitals").then(
      ({ onCLS, onINP, onLCP, onFCP, onTTFB, onFID }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onLCP(onPerfEntry);
        onFCP(onPerfEntry);
        onTTFB(onPerfEntry);
        onFID(onPerfEntry);
      },
    );
  }
};

export default reportWebVitals;
