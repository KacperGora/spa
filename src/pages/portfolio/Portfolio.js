import NavBar from '../../components/layout/navBar/NavBar' 
import Gallery from "../../components/portfolio/gallery/Gallery"
import classes from './Portfolio.module.css'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { Fragment } from 'react';


const Portfolio = () => {
    return (
      <Fragment>
        <NavBar />
        <div className={classes.container}>
          <h3 className={classes.heading}>
            Więcej moich prac znajdziecie na moim profilu Facebook  <FaFacebook /> oraz
            Instagram <FaInstagram />
          </h3>
         
        </div>
        <Gallery />
      </Fragment>
    );
}

export default Portfolio