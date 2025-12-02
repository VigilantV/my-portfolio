import { useRef } from "react";
import sendEmail from "../../desktop/contact/sendEmail";
import downloadFile from "../../common/downloadFile";
import classes from "../../../styles/mobile/contact.module.scss";
import telegramIcon from "../../../images/icons/telegram.png";
import githubIcon from "../../../images/icons/github.png";
import linkedinIcon from "../../../images/icons/linkedin.png";

const socialLinks = [
  { href: "https://t.me/Classicplayer", icon: telegramIcon, label: "Telegram" },
  { href: "https://github.com/VigilantV", icon: githubIcon, label: "GitHub" },
  {
    href: "https://www.linkedin.com/in/mehrabgheibi/",
    icon: linkedinIcon,
    label: "LinkedIn",
  },
];

const MobileContact = () => {
  const formRef = useRef(null);

  return (
    <div className={classes.contact}>
      <div className={classes.header}>
        <p className={classes.eyebrow}>Let&apos;s build together</p>
        <h2>Contact</h2>
        <p>
          Share a challenge, idea, or opportunity. I usually respond within 48
          hours.
        </p>
      </div>
      <div className={classes.card}>
        <form
          ref={formRef}
          className={classes.form}
          autoComplete="off"
          onSubmit={(e) => sendEmail(e, formRef)}
        >
          <label>
            Name
            <input type="text" name="from_name" required placeholder="Jane Doe" />
          </label>
          <label>
            Email
            <input
              type="email"
              name="from_email"
              required
              placeholder="jane@email.com"
            />
          </label>
          <label>
            Message
            <textarea
              name="message"
              required
              placeholder="Tell me about your project..."
              rows={4}
            />
          </label>
          <button type="submit">Send Message</button>
        </form>
        <div className={classes.info_panel}>
          <p>
            Prefer something quick? Ping me on social or grab the résumé to see
            more details.
          </p>
          <button
            type="button"
            className={classes.resume_button}
            onClick={downloadFile}
          >
            Download Résumé
          </button>
          <div className={classes.socials}>
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <img src={social.icon} alt={social.label} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileContact;

