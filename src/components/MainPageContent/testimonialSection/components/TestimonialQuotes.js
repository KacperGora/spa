import { testimonials } from "../testimonialObject";
import classes from "../Testimonials.module.css";
function TestimonialQuotes() {
  return testimonials.map((testimonial) => (
    <figure key={Math.random()} className={classes.testimonial}>
      <img
        className={classes.testimonialImage}
        src={testimonial.src}
        alt="Customer face"
      />
      <blockquote className={classes.testimonialText}>
        {testimonial.quote}
      </blockquote>
      <p className={classes.testimonialName}>{testimonial.author}</p>
    </figure>
  ));
}

export default TestimonialQuotes;
