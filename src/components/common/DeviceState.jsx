import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import {
  midDeskStateAtom,
  tabletStateAtom,
  mobiletStateAtom,
} from "../../store/deviceState";

const DeviceState = ({ children }) => {
  const setMidDeskState = useSetRecoilState(midDeskStateAtom);
  const setTabletState = useSetRecoilState(tabletStateAtom);
  const setMobileState = useSetRecoilState(mobiletStateAtom);

  const windowSizeChangeHandler = () => {
    setMidDeskState(window.innerWidth <= 1381);
    setTabletState(window.innerWidth <= 1000);
    setMobileState(window.innerWidth <= 530);
  };
  useEffect(() => {
    window.addEventListener("resize", windowSizeChangeHandler);
    return () => {
      window.removeEventListener("resize", windowSizeChangeHandler);
    };
  }, []);

  return <>{children}</>;
};

export default DeviceState;
