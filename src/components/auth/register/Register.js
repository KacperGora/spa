import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../layout/navBar/NavBar";
import Spinner from "../../UI/spinner/Spinner";
import authFn from "../authFn";
import fetchFn from "../../fetch";
import classes from "./Register.module.css";
import useInput from "../use-input";

const Register = () => {
  const [passwordsAreValid, setPasswordAreValid] = useState(false);

  //name validation
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  // //second name validation
  const {
    value: enteredSecondName,
    isValid: enteredSecondNameIsValid,
    hasError: secondNameInputHasError,
    valueChangeHandler: secondNameChangeHandler,
    inputBlurHandler: secondNameBlurHandler,
  } = useInput((value) => value.trim() !== "");

  // mail validation
  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputHasError,
    valueChangeHandler: mailChangeHandler,
    inputBlurHandler: mailBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.includes("@"));
  //phone number validation
  const {
    value: enteredPhoneNumber,
    isValid: enteredPhoneNumberIsValid,
    hasError: phoneNumberHasError,
    valueChangeHandler: phoneNumberChangeHandler,
    inputBlurHandler: phoneNumberBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.trim().length === 9);

  //password validation

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "" && value.trim().length > 5);

  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
     if ((enteredPassword === confirmPassword) & enteredPasswordIsValid) {
       setPasswordAreValid(true);
     }
  }, [confirmPassword, enteredPassword, enteredPasswordIsValid]);


  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredSecondNameIsValid &&
    enteredMailIsValid &&
    enteredPhoneNumberIsValid &&
    enteredPasswordIsValid &&
    passwordsAreValid
  ) {
    formIsValid = true;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(undefined);

  const navigate = useNavigate();
  const registerUrl =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGWo9-dHn91oycTewIhxo2TyM8C8ZOEdw";
  const userUrl =
    "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/users.json";

  const body = {
    email: enteredMail,
    phoneNumber: enteredPhoneNumber,
    name: enteredName,
    secondName: enteredSecondName,
    meetings: [],
  };
  const submitHandler = async (e) => {
    if (!formIsValid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsLoading(true);
    const httpFeedback = await authFn(
      registerUrl,
      enteredMail,
      enteredPassword
    );
    setIsLoading(false);
    console.log(httpFeedback);
    if (httpFeedback.response.ok) {
      setStatus(true);
      fetchFn(userUrl, "POST", body);
    }
  };

  // };
  const historyLoginPush = () => {
    navigate("/login");
  };
  return (
    <section>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.container}>
          <form onSubmit={submitHandler}>
            <input
              className={nameInputHasError ? classes.invalidInput : ""}
              onChange={(e) => nameChangeHandler(e)}
              onBlur={() => nameBlurHandler()}
              minLength="4"
              type="text"
              placeholder="Imię"
              required
            />
            <input
              className={secondNameInputHasError ? classes.invalidInput : ""}
              onChange={(e) => {
                secondNameChangeHandler(e);
              }}
              onBlur={() => secondNameBlurHandler()}
              placeholder="Nazwisko"
              type="text"
              required
            />
            <input
              className={mailInputHasError ? classes.invalidInput : ""}
              onChange={(e) => mailChangeHandler(e)}
              type="mail"
              required
              onBlur={() => {
                mailBlurHandler();
              }}
              placeholder="Adres email"
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"
            ></input>
            <input
              className={phoneNumberHasError ? classes.invalidInput : ""}
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{3}"
              aria-required={true}
              onChange={(e) => phoneNumberChangeHandler(e)}
              required
              onBlur={() => {
                phoneNumberBlurHandler();
              }}
              placeholder="Numer telefonu"
            ></input>
            <input
              className={passwordHasError ? classes.invalidInput : ""}
              onChange={(e) => passwordChangeHandler(e)}
              type="password"
              placeholder="Hasło"
              minLength="5"
              required
              onBlur={() => {
                passwordBlurHandler();
              }}
            ></input>

            <input
              className={passwordHasError ? classes.invalidInput : ""}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Powtórz hasło"
              minLength="5"
              required
              onBlur={() => {
                passwordBlurHandler();
              }}
            ></input>

            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Powrót do logowania
            </button>
            <button type="submit">Rejestracja</button>
            <div>{isLoading && <Spinner />}</div>
          </form>
          {status && (
            <p style={{ fontSize: "22px" }}>
              Sukces, za chwilę zostaniesz przekierowana do strony logowania.
            </p>
          )}
          {(nameInputHasError || secondNameInputHasError) && (
            <p>Nie wprowadzono danych.</p>
          )}
          {mailInputHasError && <p>Nieprawidłowy adres email. </p>}
          {passwordHasError && (
            <p>Hasło powinno mieć conajmniej pięć znaków.</p>
          )}
          {status && setTimeout(historyLoginPush, 3000)}
        </div>
      </section>
    </section>
  );
};

export default Register;
