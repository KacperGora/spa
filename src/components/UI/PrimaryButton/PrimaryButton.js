import { Link } from "react-router-dom";
import classes from "./PrimaryButton.module.css";
function PrimaryButton({ children, destination }) {
  return (
    <Link
      className={`${classes.btn} ${classes.full} ${classes.marginRightSM}`}
      to={destination}
    >
      {children}
    </Link>
  );
}

export default PrimaryButton;
