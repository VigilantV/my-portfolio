import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

const dashAnimation = (animationRef) => {
  let ctx = gsap.context(() => {
    var tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333,0 0.66667,0.33333 1,1 "
        ),
      },
    });
    tl.to("#dash", {
      y: "15vw",
      rotation: -27,
    })
      .to("#dash", {
        y: "13vw",
        x: "0.3vw",
        rotation: 30,
        duration: 0.1,
      })
      .to("#dash", {
        y: "5vw",
        x: "2.5vw",
        ease: CustomEase.create(
          "custom",
          "M0,0 C0.33333, 0.66667, 0.66667, 1 1,1 "
        ),
      })
      .to(
        "#dash",
        {
          rotation: 900,
          duration: 2,
          ease: CustomEase.create("custom", "M0,0,C0,0.198,0.8,1,1,1"),
        },
        "<"
      )
      .to(
        "#dash",
        {
          y: "15vw",
          x: "5vw",
        },
        "<1"
      )
      .to(
        "#lazer",
        {
          x: "41vw",
          duration: 0.5,
        },
        "<0.5"
      )
      .set("#lazer", { display: "none" })
      .to(
        "#dash",
        {
          x: "13.8vw",
          duration: 0.5,
          ease: "power1.out",
        },
        "<"
      )
      .to(
        "#dash",
        {
          opacity: 0,
        },
        "<0.1"
      )
      .to(
        "#chevron",
        {
          scale: 1,
          y: "-7vw",
        },
        "<"
      );
  }, animationRef);

  return ctx;
};

export default dashAnimation;
