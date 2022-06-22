import { Fragment } from "react"
import Hero from '../../components/heroSection/Hero'
import HowItWorks from '../../components/howItWorksSection/HowItWorks'
import NavBar from "../../components/mainPage/NavBar";
import Testimonials from '../../components/testimonialSection/Testimonials'

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