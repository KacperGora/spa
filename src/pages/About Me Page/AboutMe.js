import React, { Fragment } from "react";
import NavBar from "../../layout/navBar/NavBar";
import About from "../../components/About Me/About";
import Footer from "../../layout/footer/Footer";
import classes from "./AboutMe.module.css";
const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <About />
      <div className={classes.footerBox}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default AboutMe;
