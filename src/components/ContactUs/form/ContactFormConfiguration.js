import { MdOutlineEmail, MdOutlineMessage, MdPerson } from "react-icons/md";
import classes from "./ContactForm.module.css";
export const contactFormConfiguration = [
  {
    icon: <MdPerson className={classes.icons} />,
    placeholder: "Imię i nazwisko",
  },
  {
    icon: <MdOutlineEmail className={classes.icons} />,
    placeholder: "Email",
  },
  {
    icon: <MdOutlineMessage className={classes.icons} />,
    placeholder: "Wiadomość",
    className: classes.inputMessage,
  },
];
