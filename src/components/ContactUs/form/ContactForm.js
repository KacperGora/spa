import React from "react";
import CustomLinkBox from "../../UI/CustomLinkBox/CustomLinkBox";
import classes from "./ContactForm.module.css";
import { contactFormConfiguration } from "./ContactFormConfiguration";
function ContactForm() {
  return (
    <>
      <div className={classes.formDescriptionContainer}>
        <h2 className={classes.formTitle}>FORMULARZ KONTAKTOWY </h2>
        <h3 className={classes.description}>
          Wypełnij formularz kontaktowy. Na każde zapytanie odpowiadamy
          maksymalnie w 48 godzin. Dla szybszej informacji zalecamy kontakt
          telefoniczny.
        </h3>
      </div>
      <form className={classes.contactForm}>
        {contactFormConfiguration.map((input) => (
          <div key={input.placeholder} className={classes.inputContainer}>
            {input.icon}
            <input
              placeholder={input.placeholder}
              className={input.className}
            />
          </div>
        ))}
        <CustomLinkBox primary destination={"/"}>
          Wyślij
        </CustomLinkBox>
      </form>
    </>
  );
}

export default ContactForm;
