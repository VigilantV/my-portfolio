const TitleSvg = ({
  pathData,
  width,
  viewBox,
  titleAnimated,
  customClass = "",
  pathClassName = "",
  animateClassName = "",
}) => {
  return (
    <svg
      width={width}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid meet"
      className={customClass}
    >
      <path
        className={`${pathClassName} ${titleAnimated ? animateClassName : ""}`}
        d={pathData}
      />
    </svg>
  );
};

export default TitleSvg;
