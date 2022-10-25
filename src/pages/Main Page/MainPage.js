import { Fragment } from "react";

import Hero from "../../components/MainPageContent/heroSection/Hero";
import HowItWorks from "../../components/MainPageContent/howItWorksSection/HowItWorks";
import Testimonials from "../../components/MainPageContent/testimonialSection/Testimonials";

import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";

const Main = () => {
  return (
    <Fragment>
      <NavBar />
      <Hero />
      <HowItWorks />
      <Testimonials />
      <Footer />
    </Fragment>
  );
};
export default Main;
