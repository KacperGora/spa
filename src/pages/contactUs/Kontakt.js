import { Fragment } from "react";
import NavBar from "../../components/layout/navBar/NavBar";
import classes from "./Kontakt.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


const Kontakt = () => {
  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <span className={classes.subheading}>KONTAKT</span>
        <h2 className={classes.secondary}>Wybierz coś dla siebie..</h2>
        <div className={classes.grid}>
          <h1>
            <FaFacebook />
          </h1>

          <h1>
            <FaInstagram />
          </h1>

          <p>mapa</p>
        </div>
      </section>
    </Fragment>
  );
};

export default Kontakt;
