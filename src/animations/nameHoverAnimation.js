import { gsap } from "gsap";

const nameHoverAnimation = (animationRef) => {
  let ctx = gsap.context(() => {
    const strechName = gsap.to("#name", {
      paused: true,
      letterSpacing: "0.1vw",
      duration: 0.5,
      ease: "ease",
    });

    const name = document.getElementById("name");
    name.addEventListener("mouseenter", () => {
      strechName.play();
    });
    name.addEventListener("mouseleave", () => {
      strechName.reverse();
    });
  }, animationRef);

  return ctx;
};

export default nameHoverAnimation;
