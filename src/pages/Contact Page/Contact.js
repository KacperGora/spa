import { Fragment } from "react";
import classes from "./Contact.module.css";
import Map from "../../components/ContactUs/map/Map";
import NavBar from "../../layout/navBar/NavBar";
import Footer from "../../layout/footer/Footer";
import ContactDetail from "../../components/ContactUs/contactDetail/ContactDetail";
import ContactForm from "../../components/ContactUs/form/ContactForm";
import Container from "../../layout/Container/Container";
import PageHeading from "../../components/UI/PageHeading/PageHeading";

const Contact = () => {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <span className={classes.subheading}>KONTAKT</span>
        <PageHeading> Wybierz coś dla siebie...</PageHeading>
        <h2 className={classes.mapHeading}>GDZIE NAS ZNALEŚĆ?</h2>
        <div className={classes.grid}>
          <ContactDetail />
          <Map />
          <ContactForm />
        </div>
      </Container>
      <Footer />
    </Fragment>
  );
};

export default Contact;
