import { useRef, useEffect } from "react";
import { Button } from "@mui/material";

import TextFieldTemplate from "./TextFieldTemplate";
import textShiveringAnimation from "../../animations/textShiveringAnimation";
import downloadFile from "../common/downloadFile";
import sendEmail from "./sendEmail";

import classes from "../../styles/contact.module.scss";
import telegram from "../../images/icons/telegram.png";
import github from "../../images/icons/github.png";
import linkedin from "../../images/icons/linkedin.png";

const Contact = () => {
  const formRef = useRef();

  const contactAnimationRef = useRef(null);

  useEffect(() => {
    let ctx = textShiveringAnimation(contactAnimationRef);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <div className={classes.resume_btn}>
        <p
          ref={contactAnimationRef}
          style={{ cursor: "pointer" }}
          onClick={downloadFile}
        >
          my resume
        </p>

      </div>
      <div className={classes.contact_section}>
        <form
          ref={formRef}
          className={classes.input_section}
          onSubmit={(e) => sendEmail(e, formRef)}
        >
          <p className={classes.question}>
            Have a question or wanna get in touch ?
          </p>
          <TextFieldTemplate label="Name" name="from_name" type="text" />
          <TextFieldTemplate label="Email" name="from_email" type="email" />
          <textarea
            name="message"
            placeholder="Message"
            required
            className={classes.text_area}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              alignSelf: "end",
              width: "7vw",
              height: "2.6vw",
              fontSize: "1.25vw",
              fontFamily: "calibri",
              whiteSpace: "nowrap",
              marginRight: "2vw",
              color: window.whitish,
              backgroundColor: window.rouge,
              borderRadius: "0.5vw",
              "&:hover": {
                background: window.lightRouge,
              },
              transition: "background-color 0.3s",
            }}
          >
            Submit
          </Button>
        </form>
        <div className={classes.icons_section}>
          <a href="https://t.me/Classicplayer">
            <img className={classes.telegram} src={telegram} alt="telegram" />
          </a>
          <a href="https://github.com/VigilantV">
            <img className={classes.github} src={github} alt="github" />
          </a>
          <a href="https://www.linkedin.com/in/mehrabgheibi/">
            <img className={classes.linkedin} src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
