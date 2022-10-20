import NavBar from "../../../../layout/navBar/NavBar";
import classes from "./Register.module.css";
import Input from "../../../../components/UI/Input/Input";
import useAuthRegister from "../../../../hooks/useAuthRegister";
import FormStatus from "../../../../components/Auth/FormStatus";
import FormButtons from "../../../../components/Auth/FormButtons";

const Register = () => {
  const { ...registerParams } = useAuthRegister();

  return (
    <>
      <NavBar />
      <section className={classes.container}>
        <div className={`${classes.container}`}>
          <form
            className={classes.form}
            onSubmit={registerParams.registerSubmitHandler}
          >
            <h2 className={classes.formHeader}>Zarejestruj konto</h2>
            <div className={classes.gridContainer}>
              {registerParams.registerFormConfiguration.map((input) => {
                return (
                  <div className={`${classes.singleInput} `}>
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
              onclickDestination={"login"}
              disabled={registerParams.formIsValid}
              alternativeActionText="Powrót do logowania"
              actionText="Rejestracja"
            />
            <FormStatus
              isLoading={registerParams.isLoading}
              error={registerParams.authError}
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default Register;
