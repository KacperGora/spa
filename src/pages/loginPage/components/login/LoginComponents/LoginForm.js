import React from "react";
import Input from "../../../../../components/UI/Input/Input";
import classes from "./LoginForm.module.css";
import useAuthLogin from "../../../../../hooks/useAuthLogin";
import FormButtons from "../../../../../components/Auth/FormButtons";
import FormStatus from "../../../../../components/Auth/FormStatus";

function LoginForm() {
  const { ...loginParams } = useAuthLogin("login");
  return (
    <form className={classes.form} onSubmit={loginParams.loginSubmitHandler}>
      <h2 className={classes.formHeader}>Zaloguj się</h2>
      {loginParams.formConfiguration.map((input) => {
        return (
          <div className={classes.inputContainer}>
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
        onclickDestination={"register"}
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
