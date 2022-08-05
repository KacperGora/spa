import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import NavBar from "../../../../layout/navBar/NavBar";
import Spinner from "../../../../components/UI/spinner/Spinner";

import PhoneIcon from "@mui/icons-material/Phone";
import classes from "./Register.module.css";
import useInput from "../../../../hooks/use-input";
import Input from "../Input";
import BadgeIcon from "@mui/icons-material/Badge";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { serverTimestamp, setDoc, doc } from "firebase/firestore";

import { db } from "../../../../firebase";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../../firebase";

const Register = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
 
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

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredSecondNameIsValid &&
    enteredMailIsValid &&
    enteredPhoneNumberIsValid &&
    enteredPasswordIsValid
  ) {
    formIsValid = true;
  }

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(undefined);

  const submitHandler = async (e) => {
    if (!formIsValid) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setIsLoading(true);

    //creating user
    createUserWithEmailAndPassword(auth, enteredMail, enteredPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: enteredName,
        });
        setStatus(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorCode || errorMessage);
      });
  };
  //adding user to collection
  useEffect(() => {
    const addUserToCollection = async () => {
      if (status) {
        const docRef = await setDoc(doc(db, "users", enteredMail), {
          email: enteredMail,
          phoneNumber: enteredPhoneNumber,
          name: enteredName,
          secondName: enteredSecondName,
          meetings: [],
          timestamp: serverTimestamp(),
        });
      }
    };
    addUserToCollection();
  }, [enteredMail, enteredName, enteredPhoneNumber, enteredSecondName, status]);

  const historyLoginPush = () => {
    navigate("/login");
  };

  return (
    <section>
      <NavBar />
      <section className={classes.container}>
        <div className={`${classes.container}`}>
          <form className={classes.form} onSubmit={submitHandler}>
            <h2
              style={{
                textAlign: "center",
                padding: "10px",
                marginBottom: "8px",
              }}
            >
              Zarejestruj konto
            </h2>
            <div
              className={`${classes.handler} ${
                active ? classes.handlerGrid : ""
              } `}
            >
              <BadgeIcon className={classes.icon} />
              <Input
                onChange={nameChangeHandler}
                onBlur={nameBlurHandler}
                type="text"
                hasError={nameInputHasError}
                placeholder="Imię"
              />
              <DriveFileRenameOutlineIcon className={classes.icon} />
              <Input
                onChange={secondNameChangeHandler}
                onBlur={secondNameBlurHandler}
                type="text"
                hasError={secondNameInputHasError}
                placeholder="Nazwisko"
              />
            </div>
            <div className={classes.handler}>
              <AlternateEmailIcon className={classes.icon} />
              <Input
                onChange={mailChangeHandler}
                onBlur={mailBlurHandler}
                type="mail"
                hasError={mailInputHasError}
                placeholder="Adres email"
                pattern={"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$"}
              />
              <PhoneIcon className={classes.icon} />
              <Input
                onChange={phoneNumberChangeHandler}
                onBlur={phoneNumberBlurHandler}
                type="tel"
                hasError={phoneNumberHasError}
                placeholder="Numer telefonu"
                pattern={"[0-9]{3}[0-9]{3}[0-9]{3}"}
              />
            </div>
            <div className={classes.handler}>
              <LockIcon className={classes.icon} />
              <Input
                onChange={passwordChangeHandler}
                onBlur={passwordBlurHandler}
                type="password"
                hasError={passwordHasError}
                placeholder="Hasło"
                minLength="5"
              />
            </div>
            <div className={classes.button}>
              <button
                className={classes.button}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Powrót do logowania
              </button>
              <button
                className={classes.button}
                type="submit"
                disabled={!formIsValid}
              >
                Rejestracja
              </button>
            </div>
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
          {error && <p>{error}</p>}
        </div>
      </section>
    </section>
  );
};

export default Register;
