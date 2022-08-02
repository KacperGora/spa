import { Fragment } from "react";
import classes from "./Kontakt.module.css";
import Map from "./components/map/Map";
import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
import ContactForm from "./components/form/ContactForm";
import ContactDetail from "./components/contactDetail/ContactDetail";

const Kontakt = () => {
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

export default Kontakt;
