import { gsap } from "gsap";

const textShiveringAnimation = (animationRef) => {
  let animation;

  const ctx = gsap.context(() => {
    animation = gsap.timeline({
      defaults: {
        duration: 0.1,
        yoyo: true,
        repeat: 6,
        ease: "none",
      },
    });
    animation.to(animationRef.current, {
      x: "+=6",
    });
  }, animationRef);

  setInterval(() => {
    animation.restart();
  }, 7000);

  return ctx;
};

export default textShiveringAnimation;
