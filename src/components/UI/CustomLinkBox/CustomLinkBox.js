import { Link } from "react-router-dom";
import classes from "./CustomLinkBox.module.css";
function CustomLinkBox({ children, destination, primary, sm, logout }) {
  const buttonClass = primary
    ? `${classes.btn} ${classes.full} ${classes.marginRightSM}`
    : `${classes.btn} ${classes.outline}`;

  return (
    <Link
      className={`${buttonClass} ${sm && classes.small} ${
        logout && classes.logout
      }`}
      to={destination}
    >
      {children}
    </Link>
  );
}

export default CustomLinkBox;
