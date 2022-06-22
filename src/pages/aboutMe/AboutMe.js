import { Fragment } from "react";
import NavBar from "../../components/mainPage/navBarSection/NavBar";
import classes from "./AboutMe.module.css";

import React from "react";

const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.hero}>
          <p className={classes.heading}>Hej</p>
          <p className={classes.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
        </div>
        <div className={`${classes.heading} ${classes.description}`}>Hello</div>
      </section>
    </Fragment>
  );
};

export default AboutMe;
