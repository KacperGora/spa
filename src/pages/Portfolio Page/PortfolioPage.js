import Gallery from "../../components/Portfolio/Gallery";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Fragment } from "react";
import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";
import classes from "./Portfolio.module.css";
import Container from "../../layout/Container/Container";

const Portfolio = () => {
  return (
    <Fragment>
      <NavBar />
      <Container>
        <h3 className={classes.heading}>
          Więcej moich prac znajdziecie na moich profilach
          <div className={classes.contain}>
            <div className={classes.iconsContainer}>
              <a href="https://www.facebook.com/aroundherbeauty/">
                <FaFacebook className={classes.icons} />
              </a>
            </div>
            <div className={classes.iconsContainer}>
              <a href="https://www.instagram.com/aroundherbeauty/">
                <FaInstagram className={classes.icons} />
              </a>
            </div>
          </div>
        </h3>
      </Container>
      <Gallery />
      <Footer />
    </Fragment>
  );
};

export default Portfolio;
