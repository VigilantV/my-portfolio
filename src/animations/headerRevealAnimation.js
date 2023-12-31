import { Elastic, gsap } from "gsap";

const headerRevealAnimation = (animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        delay: 0.4,
        duration: 0.7,
        ease: Elastic.easeOut.config(1.6, 2),
        stagger: 0.3,
      },
    });
    tl.fromTo(
      ["#greeting", "#name", "#profession"],
      { x: "-30vw", opacity: 0, scale: 0.5 },
      { x: 0, opacity: 1, scale: 1 }
    );
  }, animationRef);

  return ctx;
};

export default headerRevealAnimation;
