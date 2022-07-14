import { Fragment } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import classes from "./Kontakt.module.css";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import {
  MdSmartphone,
  MdOutlineEmail,
  MdOutlineLocationOn,
  MdPerson,
  MdOutlineMessage,
} from "react-icons/md";

import Map from "../../components/map/Map";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../../components/layout/footer/Footer";

const Kontakt = () => {
  const isAuth = useSelector((state) => state.auth.isLogged);
  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <span className={classes.subheading}>KONTAKT</span>
        <h2 className={classes.secondary}>Wybierz coś dla siebie...</h2>
        <h2 className={classes.mapHeading}>GDZIE NAS ZNALEŚĆ?</h2>
        <div className={classes.grid}>
          <div className={classes.contactDetail}>
            <span>
              <MdOutlineLocationOn className={classes.icons} />
            </span>{" "}
            Ptaszkowa 20, 33-333 PTASZKOWA,
            <p>
              <span>
                <MdSmartphone className={classes.icons} />
              </span>
              <a href="tel:123-456-789">123-456-789</a>
            </p>
            <span>
              <MdOutlineEmail className={classes.icons} />
            </span>
            <a href="mailto:kontakt@aroundherbeauty.com.pl">
              kontakt@aroundherbeauty.com
            </a>
            <br />
            Znajdziesz nas również tutaj!
            <br />
            <a href="https://www.facebook.com/aroundherbeauty/">
              <FaFacebook className={classes.icons} />
            </a>
            <a href="https://www.instagram.com/aroundherbeauty/">
              <FaInstagram className={classes.icons} />
            </a>
            <br />
            {isAuth && (
              <Link
                to="/calendar"
                className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
              >
                Zadbaj o swoje dłonie
              </Link>
            )}
            {!isAuth && (
              <Link
                to="/login"
                className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
              >
                Zadbaj o swoje dłonie
              </Link>
            )}
          </div>

          <div>
            <Map />
          </div>
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
        </div>
      </section>
      <Footer />
    </Fragment>
  );
};

export default Kontakt;
