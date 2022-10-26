import { Link } from "react-router-dom";
import classes from "./CustomButton.module.css";
function PrimaryButton({ children, destination, primary }) {
  const buttonClass = primary
    ? `${classes.btn} ${classes.full} ${classes.marginRightSM}`
    : `${classes.btn} ${classes.outline}`;
  return (
    <Link className={buttonClass} to={destination}>
      {children}
    </Link>
  );
}

export default PrimaryButton;

// import { Link } from "react-router-dom";
// import classes from "./SecondaryButton.module.css";
// function SecondaryButton({ children, destination }) {
//   return (
//     <Link className={`${classes.btn} ${classes.outline}`} to={destination}>
//       {children}
//     </Link>
//   );
// }

// export default SecondaryButton;
