import { Fragment } from "react"
import Hero from "../../components/mainPage/heroSection/Hero";
import HowItWorks from "../../components/mainPage/howItWorksSection/HowItWorks";
import NavBar from "../../components/mainPage/navBarSection/NavBar";
import Testimonials from "../../components/mainPage/testimonialSection/Testimonials";

const Main = () => {
    return (
      <Fragment>
        <NavBar />
        <Hero />
        <HowItWorks />
        <Testimonials />
      </Fragment>
    );
}
export default Main