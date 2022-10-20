import classes from "./Input.module.css";
const Input = (props) => {
  console.log(props.hasError);
  return (
    <div className={classes.inputContainer}>
      <input
        className={props.hasError ? classes.invalidInput : classes.input}
        onChange={(e) => {
          props.onChange(e);
        }}
        onBlur={() => props.onBlur()}
        placeholder={props.placeholder}
        type={props.type}
        required
        pattern={props.pattern}
        minLength={props.minLength}
      />

      {props.hasError && <p className={classes.errorParagraph}>Wprowadź poprawne dane</p>}
    </div>
  );
};

export default Input;
