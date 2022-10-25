import { Link } from "react-router-dom";
import classes from "./SecondaryButton.module.css";
function SecondaryButton({ children, destination }) {
  return (
    <Link className={`${classes.btn} ${classes.outline}`} to={destination}>
      {children}
    </Link>
  );
}

export default SecondaryButton;
