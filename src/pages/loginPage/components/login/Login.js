import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../../store/loginSlice";
import { userActions } from "../../../store/usersSlice";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import authFn from "../authFn";
import fetchFn from "../../fetch";
import useInput from "../use-input";
import Input from "../register/Input";
import Footer from "../../layout/footer/Footer";

const Login = () => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //custom hook for email validation
  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
    reset: resetMailInput,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));

  //custom hook for password validation
  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 5);

  let formIsValid = false;
  if (enteredMailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  //validation

  const loginUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGWo9-dHn91oycTewIhxo2TyM8C8ZOEdw";
  const usersUrl =
    "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/users.json";

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!enteredMailIsValid) {
      setIsLoading(false);
      return;
    } else {
      setIsLoading(false);
      const httpFeedback = await authFn(loginUrl, enteredMail, enteredPassword);
      console.log(httpFeedback);
      if (httpFeedback.data.error) {
        setError(true);
        if (httpFeedback.data.error.message === "EMAIL_NOT_FOUND") {
          setErrorMessage("Podano nieprawidłowe dane.");
        }
      }

      if (httpFeedback && httpFeedback.response && httpFeedback.response.ok) {
        dispatch(loginActions.login());
        const httpFeedback = await fetchFn(usersUrl);

        let users = [];
        for (let key in httpFeedback.data) {
          users.push(httpFeedback.data[key]);
        }
        dispatch(
          userActions.setUser(
            ...users.filter((user) => user.email === enteredMail)
          )
        );
        navigate("/");
      }
      if (
        httpFeedback &&
        httpFeedback.data &&
        httpFeedback.data.email === "admin@test.pl"
      ) {
        dispatch(loginActions.admin(true));
      }
      resetMailInput();
    }
  };

  return (
    <section className={classes.container}>
      <section className={classes.container}>
        <form onSubmit={loginSubmitHandler}>
          <Input
            onChange={mailChangeHandler}
            hasError={mailInputHasError}
            type="mail"
            onBlur={mailBlurHandler}
            placeholder="Adres email"
          />

          <Input
            onChange={passwordChangeHandler}
            hasError={passwordInputHasError}
            type="password"
            onBlur={passwordBlurHandler}
            placeholder="Hasło"
          />

          <button disabled={!formIsValid}>Zaloguj</button>
          <button
            type="submit"
            onClick={() => {
              navigate("/register");
            }}
          >
            Nie masz konta?
          </button>
          {mailInputHasError && <p>Nie wprowadzono poprawnego adresu email.</p>}
          {passwordInputHasError && <p>Nie wprowadzono poprawnego hasła.</p>}
          {error && <p>{errorMessage}</p>}
          {isLoading && <Spinner />}
        </form>
      </section>
      <Footer />
    </section>
  );
};

export default Login;
