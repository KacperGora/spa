import { Fragment } from "react"
import Hero from "../components/mainPage/Hero";
import HowItWorks from "../components/mainPage/HowItWorks";
import NavBar from "../components//mainPage/NavBar";
import Testimonials from "../components/mainPage/Testimonials";

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