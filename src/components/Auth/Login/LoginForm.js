import React from "react";
import FormButtons from "../FormButtons";
import FormStatus from "../FormStatus";
import Input from "../../UI/Input/Input";
import classes from "./LoginForm.module.css";
import useAuthLogin from "../../../hooks/auth hooks/useAuthLogin";
function LoginForm() {
  const { ...loginParams } = useAuthLogin("login");

  return (
    <form
      data-aos="flip-left"
      className={classes.form}
      onSubmit={loginParams.loginSubmitHandler}
    >
      <h2 className={classes.formTitle}>Zaloguj się</h2>
      {loginParams.formConfiguration.map((input) => {
        return (
          <div key={input.placeholder} className={classes.inputContainer}>
            {input.icon}
            <Input
              onChange={input.onChange}
              onBlur={input.onBlur}
              type={input.type}
              placeholder={input.placeholder}
              hasError={input.hasError}
            />
          </div>
        );
      })}
      <FormButtons
        onClickDestination={"register"}
        disabled={loginParams.formIsValid}
        actionText="Zaloguj"
        alternativeActionText="Zarejestruj"
      />
      <FormStatus
        isLoading={loginParams.isLoading}
        error={loginParams.authError}
      />
    </form>
  );
}

export default LoginForm;
