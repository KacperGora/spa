import { Fragment } from "react";
import classes from "./Register.module.css";
const Input = (props) => {
  return (
    <Fragment>
      <input
        className={props.hasError ? classes.invalidInput : ""}
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
    </Fragment>
  );
};

export default Input;
