import classes from "./Appointment.module.css";
import React from "react";
import InputForm from "./InputForm";

const Appointment = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.heroText}>
        <div className={classes.brand}>
          <h1 className={classes.heading}>Twoje</h1>

        </div>
        <div>
          <InputForm />
        </div>
     
      </div>
    </section>
  );
};

export default Appointment;
