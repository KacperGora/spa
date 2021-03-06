import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../layout/navBar/NavBar";
import Spinner from "../../../../components/UI/spinner/Spinner";
import authFn from "../../../../components/auth/authFn";
import fetchFn from "../../../../components/fetch";
import classes from "./Register.module.css";
import useInput from "../../../../hooks/use-input";
import Input from "./Input";
const Register = () => {
  const [error, setError] = useState("");
  const [passwordsAreValid, setPasswordAreValid] = useState(true);

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
      setTimeout(() => {
        setPasswordAreValid(true);
      }, 400);
    } else if ((enteredPassword !== confirmPassword) & enteredPasswordIsValid) {
      setTimeout(() => {
        setPasswordAreValid(false);
      }, 250);
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
    try {
      const httpFeedback = await authFn(
        registerUrl,
        enteredMail,
        enteredPassword
      );
      setIsLoading(false);
      if (!httpFeedback.response.ok) {
        if (httpFeedback.data.error.errors[0].message === "EMAIL_EXISTS") {
          setError(`Na podany adres email zosta??o ju?? utworzone konto.`);
        } else
          setError(
            `Co?? posz??o nie tak spr??buj ponownie p????niej ${httpFeedback.data.error.errors[0].message}`
          );
      }
      if (httpFeedback.response.ok) {
        setStatus(true);
        fetchFn(userUrl, "POST", body);
      }
    } catch (error) {
      setError(error);
    }
  };
  const historyLoginPush = () => {
    navigate("/login");
  };

  return (
    <section>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.container}>
          <form onSubmit={submitHandler}>
            <Input
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              type="text"
              hasError={nameInputHasError}
              placeholder="Imi??"
            />

            <Input
              onChange={secondNameChangeHandler}
              onBlur={secondNameBlurHandler}
              type="text"
              hasError={secondNameInputHasError}
              placeholder="Nazwisko"
            />

            <Input
              onChange={mailChangeHandler}
              onBlur={mailBlurHandler}
              type="mail"
              hasError={mailInputHasError}
              placeholder="Adres email"
              pattern={"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"}
            />

            <Input
              onChange={phoneNumberChangeHandler}
              onBlur={phoneNumberBlurHandler}
              type="tel"
              hasError={phoneNumberHasError}
              placeholder="Numer telefonu"
              pattern={"[0-9]{3}[0-9]{3}[0-9]{3}"}
            />

            <Input
              onChange={passwordChangeHandler}
              onBlur={passwordBlurHandler}
              type="password"
              hasError={passwordHasError}
              placeholder="Has??o"
              minLength="5"
            />

            <Input
              onChange={setConfirmPassword}
              onBlur={passwordBlurHandler}
              type="password"
              hasError={passwordHasError}
              placeholder=" Powt??z has??o"
              minLength="5"
            />

            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Powr??t do logowania
            </button>
            <button type="submit" disabled={!formIsValid}>
              Rejestracja
            </button>
            <div>{isLoading && <Spinner />}</div>
          </form>
          {status && (
            <p style={{ fontSize: "22px" }}>
              Sukces, za chwil?? zostaniesz przekierowana do strony logowania.
            </p>
          )}
          {(nameInputHasError || secondNameInputHasError) && (
            <p>Nie wprowadzono danych.</p>
          )}
          {mailInputHasError && <p>Nieprawid??owy adres email. </p>}
          {passwordHasError && (
            <p>Has??o powinno mie?? conajmniej pi???? znak??w.</p>
          )}
          {!passwordsAreValid && <p>Hasla nie sa identyzczne</p>}
          {status && setTimeout(historyLoginPush, 3000)}
          {error && <p>{error}</p>}
        </div>
      </section>
    </section>
  );
};

export default Register;
