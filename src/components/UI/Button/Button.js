import classes from "./Button.module.css";

function Button({ onClick, children, primary }) {
  return (
    <button
      className={`${classes.button} ${primary && classes.primary}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
export default Button;
