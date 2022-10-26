import React, { Fragment } from "react";
import NavBar from "../../layout/navBar/NavBar";
import About from "../../components/About Me/About";
import Footer from "../../layout/footer/Footer";
import classes from "./AboutMe.module.css";
const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <div className={classes.main}>
        <About />
      </div>
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
