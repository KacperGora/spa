import { Fragment } from "react"
import Hero from '../../components/mainPage/heroSection/Hero'
import HowItWorks from '../../components/mainPage/howItWorksSection/HowItWorks'
import NavBar from "../../components/layout/navBar/NavBar"; 
import Testimonials from '../../components/mainPage/testimonialSection/Testimonials'
import Footer from "../../components/layout/footer/Footer";

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
}
export default Main