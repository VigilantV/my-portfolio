import { gsap } from "gsap";

let animation_1, animation_2, animation_3;

const projectImageAnimation = (animationRef) => {
  const images = ["#primary_image", "#secondary_image"];
  const ctx = gsap.context(() => {
    animation_1 = gsap
      .timeline()
      .to(images, { x: "65vw", ease: "power4.out", duration: 0.5 })
      .to(images, { x: 0, stagger: 0.3, ease: "elastic.out", duration: 1.1 });

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
        duration: 1.1,
      })
      .to(
        images,
        {
          scale: 1,
          stagger: 0.3,
          ease: "elastic.out",
          duration: 1.1,
        },
        "<"
      );

    animation_3 = gsap.to(images, {
      rotateX: -360,
      rotateY: -360,
      rotateZ: 360,
      stagger: 0.3,
      ease: "power1.out",
      duration: 1.6,
    });
  }, animationRef);

  return ctx;
};

export default projectImageAnimation;

export { animation_1, animation_2, animation_3 };
