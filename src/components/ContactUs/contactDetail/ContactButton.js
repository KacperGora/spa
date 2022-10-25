import { Link } from "react-router-dom";
import classes from "./ContactDetail.module.css";
function ContactButton({ children, destination }) {
  return (
    <Link
      className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
      to={destination}
    >
      {children}
    </Link>
  );
}

export default ContactButton;
