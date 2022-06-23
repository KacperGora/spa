import React from "react";
import classes from "./Testimonials.module.css";
import i1 from "../../../images/face1.jpg";
import i2 from "../../../images/face2.jpg";
import i3 from "../../../images/face3.jpg";
import i4 from "../../../images/face4.jpg";
import g1 from "../../../images/g1.jpg";
import g3 from "../../../images/g3.jpg";
import g4 from "../../../images/g4.jpg";
import g6 from "../../../images/g6.jpg";
import g7 from "../../../images/g7.jpg";
import g9 from "../../../images/g9.jpg";

const Testimonials = () => {
  return (
    <section className={`${classes.grid2} ${classes.testimonialSection}`}>
      <div className={classes.testmionial}>
        <span className={classes.subheading}>Lorem Ipsum </span>
        <h2 className={classes.secondary}>Wysoka jakość dla Twojego piękna</h2>

        <div className={classes.testimonials}>
          <figure className={classes.testimonial}>
            <img
              className={classes.testimonialImage}
              src={i1}
              alt="Customer face"
            />
            <blockquote className={classes.testimonialText}>
              Lorem ipsum dolor sit amet. Qui velit voluptatem 33 facere nihil
              in aspernatur aliquam! Vel inventore nesciunt ex nihil aliquam eos
              galisum voluptatem et praesentium fugit.
            </blockquote>
            <p className={classes.testimonialName}> -Joanna Rak</p>
          </figure>

          <figure className={classes.testimonial}>
            <img
              className={classes.testimonialImage}
              src={i2}
              alt="Customer face"
            />
            <blockquote className={classes.testimonialText}>
              Sed saepe doloremque ut recusandae omnis a enim quaerat sit optio
              quia id consequatur blanditiis. Qui architecto velit et saepe
              consequatur ut voluptate ducimus.
            </blockquote>
            <p className={classes.testimonialName}>Jadwiga Erks</p>
          </figure>

          <figure className={classes.testimonial}>
            <img
              className={classes.testimonialImage}
              src={i3}
              alt="Customer face"
            />
            <blockquote className={classes.testimonialText}>
              Lorem ipsum dolor sit amet. Qui velit voluptatem 33 facere nihil
              in aspernatur aliquam! Vel inventore nesciunt ex nihil aliquam eos
              galisum voluptatem et praesentium fugit.
            </blockquote>
            <p className={classes.testimonialName}>Paulina Ryś</p>
          </figure>

          <figure className={classes.testimonial}>
            <img
              className={classes.testimonialImage}
              src={i4}
              alt="Customer face"
            />
            <blockquote className={classes.testimonialText}>
              Lorem ipsum dolor sit amet. Qui velit voluptatem 33 facere nihil
              in aspernatur aliquam! Vel inventore nesciunt ex nihil aliquam eos
              galisum voluptatem et praesentium fugit.
            </blockquote>
            <p className={classes.testimonialName}>Ewelina Pawłowska</p>
          </figure>
        </div>
      </div>
      <div className={classes.gallery}>
        <figure className={classes.galleryItem}>
          <img src={g1} alt="Gallery item" />
        </figure>

        <figure className={classes.galleryItem}>
          <img src={g3} alt="Gallery item" />
        </figure>
        <figure className={classes.galleryItem}>
          <img src={g4} alt="Gallery item" />
        </figure>

        <figure className={classes.galleryItem}>
          <img src={g6} alt="Gallery item" />
        </figure>
        <figure className={classes.galleryItem}>
          <img src={g7} alt="Gallery item" />
        </figure>

        <figure className={classes.galleryItem}>
          <img src={g9} alt="Gallery item" />
        </figure>
      </div>
    </section>
  );
};

export default Testimonials;
