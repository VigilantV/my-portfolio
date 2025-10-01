import { gsap } from "gsap";

let animation_1, animation_2;

const projectImageAnimation = (animationRef) => {
  const images = ["#primary_image", "#secondary_image"];
  const ctx = gsap.context(() => {
    animation_1 = gsap
      .timeline()
      .to(images, { x: "65vw", ease: "power4.out", duration: 0.5 })
      .to(images, { x: 0, stagger: 0.3, ease: "elastic.inOut", duration: 1.7 });

    animation_2 = gsap
      .timeline()
      .to(images, {
        opacity: 0,
        scale: 0,
        ease: "power4.out",
        duration: 0.5,
      })
      .to(images, {
        opacity: 1,
        ease: "power4.out",
        duration: 1.6,
      })
      .to(
        images,
        {
          scale: 1,
          stagger: 0.3,
          ease: "elastic.out",
          duration: 1.6,
        },
        "<"
      );
  }, animationRef);

  return ctx;
};

export default projectImageAnimation;

export { animation_1, animation_2 };
