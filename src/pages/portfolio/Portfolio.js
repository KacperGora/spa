import NavBar from "../../components/layout/navBar/NavBar";
import Gallery from "./components/Gallery";
import classes from "./Portfolio.module.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Fragment } from "react";
import Footer from "../../layout/footer/Footer";

const Portfolio = () => {
  return (
    <Fragment>
      <NavBar />
      <div className={classes.container}>
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
      </div>

      <Gallery />
      <Footer />
    </Fragment>
  );
};

export default Portfolio;
