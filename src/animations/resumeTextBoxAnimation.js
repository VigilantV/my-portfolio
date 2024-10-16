import { Elastic, gsap } from "gsap";

const resumeTextBoxAnimation = (animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline();
    tl.to("#resume_box", {
      y: "25vw",
      duration: 0.5,
    })
      .to("#talk_box", {
        opacity: 0.2,
        duration: 0.1,
        ease: "power1.out",
      })
      .to("#talk_box_text", {
        opacity: 1,
        duration: 0.1,
        ease: "power1.out",
      })
      .to(
        "#resume_box",
        {
          y: "22vw",
          x: "6.5vw",
          duration: 1,
          ease: Elastic.easeOut.config(2, 0.5),
        },
        "<",
      );
  }, animationRef);

  return ctx;
};

export default resumeTextBoxAnimation;
