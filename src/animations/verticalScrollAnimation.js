import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const verticalScrollAnimation = (animationRef, setTitlesOnShow) => {
  let ctx = gsap.context(() => {
    const projectSection = document.getElementById("vertical_titles");
    const projects = document.querySelectorAll("#project");

    const scrolling = {
      enabled: true,
      events: "scroll,wheel,touchmove,pointermove".split(","),
      prevent: (e) => e.preventDefault(),
      disable() {
        if (scrolling.enabled) {
          scrolling.enabled = false;
          window.addEventListener("scroll", gsap.ticker.tick, {
            passive: true,
          });
          scrolling.events.forEach((e, i) =>
            (i ? document : window).addEventListener(e, scrolling.prevent, {
              passive: false,
            })
          );
        }
      },
      enable() {
        if (!scrolling.enabled) {
          scrolling.enabled = true;
          window.removeEventListener("scroll", gsap.ticker.tick);
          scrolling.events.forEach((e, i) =>
            (i ? document : window).removeEventListener(e, scrolling.prevent)
          );
        }
      },
    };

    const goToSection = (project) => {
      if (scrolling.enabled) {
        scrolling.disable();
        gsap.to(projectSection, {
          scrollTo: { y: project, autoKill: false },
          onComplete: scrolling.enable,
          duration: 0.3,
        });
      }
    };

    projects.forEach((project) => {
      ScrollTrigger.create({
        scroller: "#vertical_titles",
        trigger: project,
        start: `top top+=${(6 * window.innerWidth) / 100 - 2}`,
        end: "bottom top+=2",
        onEnter: () => {
          goToSection(project);
        },
        onEnterBack: () => {
          goToSection(project);
        },
      });
    });

    projects.forEach((project, i) => {
      gsap.to(project, {
        opacity: 1,
        fontSize: "2vw",
        duration: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          scroller: "#vertical_titles",
          trigger: project,
          start: `top bottom-=${(9 * window.innerWidth) / 100}`,
          end: `bottom top+=${(9 * window.innerWidth) / 100}`,
          toggleActions: "play reset play reverse",
          onEnter: () => {
            setTitlesOnShow((titleState) => ({
              ...titleState,
              [i]: true,
            }));
          },
          onLeave: () => {
            setTitlesOnShow((titleState) => ({
              ...titleState,
              [i]: false,
            }));
          },
          onEnterBack: () => {
            setTitlesOnShow((titleState) => ({
              ...titleState,
              [i]: true,
            }));
          },
          onLeaveBack: () => {
            setTitlesOnShow((titleState) => ({
              ...titleState,
              [i]: false,
            }));
          },
        },
      });
    });
  }, animationRef);

  return ctx;
};

export default verticalScrollAnimation;
