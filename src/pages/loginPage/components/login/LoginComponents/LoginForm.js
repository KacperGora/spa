import React, { useEffect, useState } from "react";
import Spinner from "../../../../../components/UI/spinner/Spinner";
import Input from "../../Input";
import useInput from "../../../../../hooks/use-input";
import { loginActions } from "../../../../../store/loginSlice";
import { userActions } from "../../../../../store/usersSlice";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { auth } from "../../../../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../../firebase";
import { calendarActions } from "../../../../../store/calendarSlice";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  let formIsValid = false;
  const loggedUser = useSelector((state) => state.user);

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

  if (enteredMailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  }
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!enteredMailIsValid) {
      setIsLoading(false);
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        enteredMail,
        enteredPassword
      );
      const user = userCredential.user;
      user.email === "admin@test.pl" && dispatch(loginActions.admin(true));
      localStorage.setItem("token", user.uid);
      dispatch(loginActions.login(user.uid));
      setIsLoading(false);
      navigate("/");

      //setting user
      const q = query(
        collection(db, "users"),
        where("email", "==", enteredMail)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        dispatch(userActions.setUser(doc.data()));
      });
    } catch (error) {
      const { code, message } = error;
      if (message === "Firebase: Error (auth/user-not-found).") {
        setError("Podano nieprawidłowe dane logowania.");
      }
      setIsLoading(false);
      throw new Error(code);
    }
    resetMailInput();
    resetPasswordInput();
  };
  // useEffect(() => {
  //   fetch(
  //     "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/meetings.json"
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const fetchedMeetings = [];
  //       if (data) {
  //         for (const [key, value] of Object.entries(data)) {
  //           fetchedMeetings.push({ ...value, key });
  //         }
  //         dispatch(calendarActions.fetchMeetings(fetchedMeetings));
  //       }
  //     });
  // }, [dispatch]);
  return (
    <form className={classes.form} onSubmit={loginSubmitHandler}>
      <div className={classes.inputContainer}>
        <AlternateEmailIcon />
        <Input
          onChange={mailChangeHandler}
          onBlur={mailBlurHandler}
          hasError={mailInputHasError}
          type="mail"
          placeholder="Adres email"
        />
      </div>

      <div className={classes.inputContainer}>
        <LockIcon />
        <Input
          onChange={passwordChangeHandler}
          hasError={passwordInputHasError}
          onBlur={passwordBlurHandler}
          type="password"
          placeholder="Hasło"
        />
      </div>

      <div className={classes.inputContainer}>
        <button disabled={!formIsValid}>Zaloguj</button>
        <button
          type="submit"
          onClick={() => {
            navigate("/register");
          }}
        >
          Nie masz konta?
        </button>
      </div>

      {mailInputHasError && <p>Nie wprowadzono poprawnego adresu email.</p>}
      {passwordInputHasError && <p>Nie wprowadzono poprawnego hasła.</p>}

      {error && <p>{error}</p>}
      {isLoading && <Spinner />}
    </form>
  );
}

export default LoginForm;
