import { useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import TextFieldTemplate from "./TextFieldTemplate";
import textShiveringAnimation from "../../animations/textShiveringAnimation";

import classes from "../../styles/contact.module.scss";
import telegram from "../../images/icons/telegram.png";
import whatsapp from "../../images/icons/whatsapp.png";
import linkedin from "../../images/icons/linkedin.png";

const Contact = () => {
  const form = useRef();

  const contactAnimationRef = useRef(null);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_cu34nko",
        "template_qmzuo3s",
        form.current,
        "mun2Y_GUgMsZ0vy8s"
      )
      .then(
        () => {
          toast.success("Your Email has been received successfully.", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 12000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            className: "toastify_style",
          });
        },
        () => {
          toast.error("Unfortunately, your email was not sent.", {
            position: toast.POSITION.TOP_LEFT,
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            className: "toastify_style",
          });
        }
      );
    e.target.reset();
  };

  useEffect(() => {
    let ctx = textShiveringAnimation(contactAnimationRef);
    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <>
      <div className={classes.resume_btn}>
        <p ref={contactAnimationRef} style={{ cursor: "pointer" }}>
          my resume
        </p>
      </div>
      <div className={classes.contact_section}>
        <form ref={form} className={classes.input_section} onSubmit={sendEmail}>
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
              fontSize: "1.2vw",
              fontFamily: "calibri",
              whiteSpace: "nowrap",
              marginRight: "1vw",
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
          <a href="https://wa.me/989114648411">
            <img className={classes.whatsapp} src={whatsapp} alt="whatsapp" />
          </a>
          <a href="https://www.linkedin.com/in/mehrab-gheibi-988bb3174/">
            <img className={classes.linkedin} src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
    </>
  );
};

export default Contact;
