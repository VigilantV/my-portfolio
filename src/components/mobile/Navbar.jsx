import classes from "../../styles/mobile/navbar.module.scss";

const Navbar = ({ sections, activeSection, onNavigate }) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.brand}>Mehrab Gheibi</div>
      <div className={classes.links}>
        {sections.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className={`${classes.link} ${
              activeSection === id ? classes.link_active : ""
            }`}
            onClick={() => onNavigate(id)}
          >
            {label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
