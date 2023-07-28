import { gsap } from "gsap";

const textShiveringAnimation = (animationRef) => {
  let animation;

  const ctx = gsap.context(() => {
    animation = gsap.timeline({
      defaults: {
        duration: 0.1,
        yoyo: true,
        repeat: 5,
        ease: "none",
      },
    });
    animation
      .to(animationRef.current, {
        x: "+=6",
      })
      .to(animationRef.current, {
        x: "+=12",
      });
  }, animationRef);

  setInterval(() => {
    animation.restart();
  }, 8000);

  return ctx;
};

export default textShiveringAnimation;
