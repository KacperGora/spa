import React from "react";
import classes from "./Testimonials.module.css";
import TestimonialImages from "./components/TestimonialImages";
import TestimonialQuotes from "./components/TestimonialQuotes";

const Testimonials = () => {
  return (
    <div className={classes.container}>
      <span className={classes.subheading}>Lorem Ipsum </span>
      <h2 className={classes.secondary}>Wysoka jakość dla Twojego piękna</h2>
      <section className={`${classes.grid2} ${classes.testimonialSection}`}>
        <div className={classes.testmionial}>
          <div className={classes.testimonials}>
            <TestimonialQuotes />
          </div>
        </div>
        <TestimonialImages />
      </section>
    </div>
  );
};

export default Testimonials;
