import { useEffect } from "react";
import { useLocation } from "react-router";

function getPosition(string, subString, index) {
  return string.split(subString, index).join(subString).length;
}

const UseScrollToTop = ({ children }) => {
  const pathName = useLocation().pathname;
  const rootPath = pathName.substring(
    pathName.indexOf("/") + 1,
    getPosition(pathName, "/", 2)
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [rootPath]);

  return <>{children}</>;
};

export default UseScrollToTop;
