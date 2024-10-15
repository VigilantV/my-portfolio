import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const sendEmail = (e, formRef) => {
  e.preventDefault();
  emailjs
    .sendForm(
      "service_cu34nko",
      "template_qmzuo3s",
      formRef.current,
      "mun2Y_GUgMsZ0vy8s",
    )
    .then(
      () => {
        toast.success("Your Email has been received successfully.");
      },
      () => {
        toast.error("Unfortunately, your email was not sent.");
      },
    );
  e.target.reset();
};

export default sendEmail;
