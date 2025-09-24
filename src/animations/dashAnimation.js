import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const dashAnimation = (animationRef) => {
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333,0 0.66667,0.33333 1,1 "
        ),
      },
    });
    tl.to("#dash", {
      y: "16vw",
      rotation: -40,
    })
      .to("#dash", {
        y: "13.5vw",
        x: "0.7vw",
        rotation: 30,
        duration: 0.12,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333, 0.66667, 0.66667, 1 1,1 "
        ),
      })
      .to("#dash", {
        y: "5vw",
        x: "5vw",
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333, 0.66667, 0.66667, 1 1,1 "
        ),
      })
      .to(
        "#dash",
        {
          rotation: 1040,
          duration: 2,
          x: "6.5vw",
          ease: CustomEase.create("custom", "M0,0,C0,0.198,0.8,0.7,1,1"),
        },
        "<"
      )
      .to(
        "#dash",
        {
          y: "16vw",
          x: "9vw",
        },
        "<1"
      )
      .to("#dash", {
        y: "15vw",
        x: "9.4vw",
        rotation: 1070,
        duration: 0.05,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333, 0.66667, 0.66667, 1 1,1 "
        ),
      })
      .to("#dash", {
        y: "10vw",
        x: "12vw",
        duration: 0.7,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333, 0.66667, 0.66667, 1 1,1 "
        ),
      })
      .to(
        "#dash",
        {
          rotation: 1980,
          duration: 1.7,
          x: "16.6vw",
          ease: CustomEase.create("custom", "M0,0,C0,0.198,0.8,0.7,1,1"),
        },
        "<"
      )
      .to(
        "#dash",
        {
          y: "16vw",
          x: "18vw",
        },
        "<0.67"
      )
      .to(
        "#dash",
        {
          duration: 0.6,
          opacity: 0,
        },
        "<0.5"
      )
      .to(
        "#chevron",
        {
          scale: 1,
          y: "-11vw",
        },
        "<"
      );
  }, animationRef);

  return ctx;
};

export default dashAnimation;
