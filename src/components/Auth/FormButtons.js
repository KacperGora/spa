import { useNavigate } from "react-router-dom";
import classes from "./FormButtons.module.css";

function FormButtons({
  onclickDestination,
  disabled,
  actionText,
  alternativeActionText,
}) {
  const navigate = useNavigate();
  return (
    <div className={classes.buttonsContainer}>
      <button
        className={classes.button}
        onClick={() => {
          navigate(`/${onclickDestination}`);
        }}
      >
        {alternativeActionText}
      </button>
      <button className={classes.button} type="submit" disabled={!disabled}>
        {actionText}
      </button>
    </div>
  );
}
export default FormButtons;
