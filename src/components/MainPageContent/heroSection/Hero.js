import classes from "./Hero.module.css";
import React from "react";
import Slider from "../../UI/slider/Slider";
import { useSelector } from "react-redux";

import CustomLinkBox from "../../UI/CustomLinkBox/CustomLinkBox";

const Hero = () => {
  const isAuth = useSelector((state) => state.auth.isLogged);
  return (
    <section className={classes.hero}>
      <div data-aos="fade-left" className={classes.grid}>
        <div>
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
          <div className={classes.actions}>
            <CustomLinkBox
              primary
              destination={isAuth ? "/calendar" : "/login"}
            >
              Zadbaj o swoje dłonie
            </CustomLinkBox>
            <CustomLinkBox destination={"#"}>Dowiedz się więcej</CustomLinkBox>
          </div>
        </div>
        <div className={classes.aa}>
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Hero;
