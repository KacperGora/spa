import classes from "./Hero.module.css";
import React from "react";

import Slider from '../../UI/slider/Slider'
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Hero = () => {
  const isAuth = useSelector((state) => state.auth.isLogged);
  return (
    <section className={classes.hero}>
      <div className={classes.grid}>
        <div className={classes.heroText}>
          <div className={classes.brand}>
            <h1 className={classes.heading}>Around her Beauty</h1>
            <p className={classes.name}>by Justyna GÓRA</p>
          </div>
          <p className={classes.description}>
            Uwolnij swoje piękno Et inventore quia ut culpa voluptatem aut iste
            ex illum nihil. Qui numquam illo ut debitis veniam ea iste sint sit
            quia explicabo. Possimus error aut inventore similique ea saepe
            quidem id quod quaerat et quasi nesciunt et repellendus iusto At
            incidunt perspiciatis? Ut voluptates quia vel temporibus incidunt ut
            officia perspiciatis?
          </p>
          {isAuth && (
            <Link
              to="/calendar"
              className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
            >
              Zadbaj o swoje dłonie
            </Link>
          )}
          {!isAuth && (
            <Link
              to="/login"
              className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
            >
              Zadbaj o swoje dłonie
            </Link>
          )}

          <a href="#" className={`${classes.btn} ${classes.outline}`}>
            Dowiedz się więcej
          </a>
        </div>
        <div className={classes.aa}>
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
