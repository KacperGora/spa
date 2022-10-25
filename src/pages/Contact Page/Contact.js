import { Fragment } from "react";
import classes from "./Contact.module.css";
import Map from "../../components/ContactUs/map/Map";
import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
import ContactDetail from "../../components/ContactUs/contactDetail/ContactDetail";
import ContactForm from "../../components/ContactUs/form/ContactForm";

const Contact = () => {
  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <span className={classes.subheading}>KONTAKT</span>
        <h2 className={classes.secondary}>Wybierz coś dla siebie...</h2>
        <h2 className={classes.mapHeading}>GDZIE NAS ZNALEŚĆ?</h2>
        <div className={classes.grid}>
          <ContactDetail />
          <Map />
          <ContactForm />
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Contact;
