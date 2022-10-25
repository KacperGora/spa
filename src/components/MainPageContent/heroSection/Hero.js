import classes from "./Hero.module.css";
import React from "react";

import Slider from "../../UI/slider/Slider";
import { useSelector } from "react-redux";
import ContactButton from "../../UI/PrimaryButton/PrimaryButton";
import PrimaryButton from "../../UI/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../UI/SecondaryButton/SecondaryButton";

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
          <div className={classes.actions}>
            <PrimaryButton destination={isAuth ? "/calendar" : "/login"}>
              Zadbaj o swoje dłonie
            </PrimaryButton>
            <SecondaryButton destination={"#"}>
              Dowiedz się więcej
            </SecondaryButton>
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
