import { Elastic, gsap } from "gsap";

const resumeTextBoxAnimation = (animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();
    tl.to("#my_resume", {
      y: "40vw",
      duration: 0.5,
    })
      .to("#my_resume", {
        opacity: 1,
        duration: 0.1,
        ease: "power1.out",
      })
      .to(
        "#my_resume",
        {
          y: "24vw",
          x: "6vw",
          duration: 1,
          ease: Elastic.easeOut.config(2, 0.5),
        },
        "<"
      );
  }, animationRef);

  return ctx;
};

export default resumeTextBoxAnimation;
