import { Fragment } from "react";
import NavBar from "../../components/layout/navBar/NavBar"; 
import classes from "./AboutMe.module.css";

import React from "react";
import About from "../../components/About/About";
import Footer from "../../components/layout/footer/Footer";


const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <About />
      <Footer />
    </Fragment>
  );
};

export default AboutMe;
