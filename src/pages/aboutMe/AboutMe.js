import { Fragment } from "react";
import NavBar from "../../components/layout/navBar/NavBar"; 
import classes from "./AboutMe.module.css";

import React from "react";
import About from "../../components/About/About";

const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <About />
    </Fragment>
  );
};

export default AboutMe;
