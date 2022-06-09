import { Fragment } from "react"
import Hero from "../components/layout/Hero";
import HowItWorks from "../components/layout/HowItWorks";
import NavBar from "../components/layout/NavBar";
import Testimonials from "../components/layout/Testimonials";

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