import { Elastic, gsap } from "gsap";

const headerRevealAnimation = (animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        delay: 0.5,
        duration: 1.2,
        ease: Elastic.easeOut.config(2.5, 2),
        stagger: 0.5,
      },
    });
    tl.fromTo(
      ["#greeting", "#profession"],
      { x: "-30vw", opacity: 0, scale: 0.5 },
      { x: 0, opacity: 1, scale: 1 }
    );
  }, animationRef);

  return ctx;
};

export default headerRevealAnimation;
