import React, { Fragment } from "react";
import NavBar from "../../layout/navBar/NavBar";
import About from "../../components/About Me/About";
import Footer from "../../layout/footer/Footer";

const AboutMe = () => {
  return (
    <Fragment>
      <NavBar />
      <About />
      <div style={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Footer />
      </div>
    </Fragment>
  );
};

export default AboutMe;
