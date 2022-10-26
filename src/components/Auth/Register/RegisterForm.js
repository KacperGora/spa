import Input from ".././../UI/Input/Input";
import useAuthRegister from "../../../hooks/auth hooks/useAuthRegister";
import FormButtons from "../FormButtons";
import FormStatus from "../FormStatus";
import classes from "./RegisterForm.module.css";
function RegisterForm() {
  const { ...registerParams } = useAuthRegister();

  return (
    <form
      className={classes.form}
      onSubmit={registerParams.registerSubmitHandler}
    >
      <h2 className={classes.formTitle}>Zarejestruj konto</h2>
      <div className={classes.inputs2GridContainer}>
        {registerParams.registerFormConfiguration.map((input) => {
          return (
            <div
              key={input.placeholder}
              className={`${classes.inputContainer} `}
            >
              {input.icon}
              <Input
                onChange={input.onChange}
                onBlur={input.onBlur}
                type={input.type}
                hasError={input.hasError}
                placeholder={input.placeholder}
              />
            </div>
          );
        })}
      </div>
      <FormButtons
        onClickDestination={"login"}
        disabled={registerParams.formIsValid}
        alternativeActionText="Powrót do logowania"
        actionText="Rejestracja"
      />
      <FormStatus
        isLoading={registerParams.isLoading}
        error={registerParams.authError}
      />
    </form>
  );
}

export default RegisterForm;
