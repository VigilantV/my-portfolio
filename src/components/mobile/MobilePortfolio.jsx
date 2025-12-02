import { useCallback, useEffect, useMemo, useState } from "react";
import Navbar from "./Navbar";
import MobileLanding from "./landing/MobileLanding";
import MobileProjects from "./projects/MobileProjects";
import MobileContact from "./contact/MobileContact";
import classes from "../../styles/mobile/mobile-portfolio.module.scss";

const NAV_OFFSET = 88;

const MobilePortfolio = () => {
  const sections = useMemo(
    () => [
      { id: "landing", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "contact", label: "Contact" },
    ],
    []
  );
  const [activeSection, setActiveSection] = useState(sections[0].id);

  const handleNavigate = useCallback((sectionId) => {
    setActiveSection(sectionId);

    if (typeof document === "undefined") return;
    const sectionElement = document.getElementById(sectionId);
    if (!sectionElement) return;

    const top =
      sectionElement.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.4,
        rootMargin: "-20% 0px -40% 0px",
      }
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={classes.wrapper}>
      <Navbar
        sections={sections}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />
      <main className={classes.content}>
        <section id="landing" className={classes.section}>
          <MobileLanding onProjectsClick={() => handleNavigate("projects")} />
        </section>
        <section id="projects" className={classes.section}>
          <MobileProjects />
        </section>
        <section id="contact" className={classes.section}>
          <MobileContact />
        </section>
      </main>
    </div>
  );
};

export default MobilePortfolio;

