import React from "react";
import { MdOutlineEmail, MdOutlineMessage, MdPerson } from "react-icons/md";
import classes from './ContactForm.module.css'
function ContactForm() {
  return (
    <>
      <div className={classes.formDescriptionContainer}>
        <h2>FORMULARZ KONTAKTOWY </h2>
        <h3 className={classes.description}>
          Wypełnij formularz kontaktowy. Na każde zapytanie odpowiadamy
          maksymalnie w 48 godzin. Dla szybszej informacji zalecamy kontakt
          telefoniczny.
        </h3>
      </div>
      <form className={classes.contactForm}>
        <div className={classes.inputContainer}>
          <MdPerson className={classes.icons} />
          <input placeholder="Imię i nazwisko"></input>
        </div>
        <div className={classes.inputContainer}>
          <MdOutlineEmail className={classes.icons} />
          <input placeholder="Email"></input>
        </div>
        <div className={classes.inputContainer}>
          <MdOutlineMessage className={classes.icons} />
          <input
            placeholder="Wiadomość"
            className={classes.inputMessage}
          ></input>
        </div>
        <a
          href="#"
          className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
        >
          Wyślij!
        </a>
      </form>
    </>
  );
}

export default ContactForm;
