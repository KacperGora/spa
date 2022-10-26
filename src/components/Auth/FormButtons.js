import { useNavigate } from "react-router-dom";
import classes from "./FormButtons.module.css";

function FormButtons({
  onClickDestination,
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
          navigate(`/${onClickDestination}`);
        }}
      >
        {alternativeActionText}
      </button>
      <button
        className={`${classes.button} ${classes.primary}`}
        type="submit"
        disabled={!disabled}
      >
        {actionText}
      </button>
    </div>
  );
}
export default FormButtons;
