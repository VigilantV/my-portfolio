import { gsap } from "gsap";
import COLORS from "../styles/theme";

const isTypingAnimation = (textId, animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 0.3,
        repeatDelay: 0.2,
        ease: "none",
        repeat: -1,
        yoyo: true,
      },
    });
    tl.fromTo(
      textId,
      { borderRightColor: "transparent" },
      { borderRightColor: COLORS.lightBlue }
    ).set(textId, { delay: 4.5, border: "none" });
  }, animationRef);

  return ctx;
};

export default isTypingAnimation;
