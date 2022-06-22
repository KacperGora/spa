import { useCallback, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

import Spinner from "../UI/spinner/Spinner";
import classes from "./Login.module.css";
import { loginActions } from "../../store/loginSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  const loginSubmitHandler = (e) => {
    e.preventDefault();
    userLogin();
  };

  const userLogin = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGWo9-dHn91oycTewIhxo2TyM8C8ZOEdw",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredMail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (response.ok) {
        dispatch(loginActions.login());
      }
      const data = await response.json();
      if (data.email === "admin@test.pl") {
        dispatch(loginActions.admin());
      };
    } catch (error) {
      console.log(error.message);
    }
  }, [dispatch, enteredMail, enteredPassword]);

  return (
    <section className={classes.container}>
      <section className={classes.container}>
        <form onSubmit={loginSubmitHandler}>
          <input
            onChange={(e) => {
              setEnteredMail(e.target.value);
            }}
            type="email"
            placeholder="Email"
          ></input>
          <input
            onChange={(e) => {
              setEnteredPassword(e.target.value);
            }}
            type="password"
            placeholder="password"
          ></input>

          <button>Zaloguj</button>
          <button
            type="submit"
            onClick={() => {
              history.push("register");
            }}
          >
            Nie masz konta?
          </button>
          {isLoading && <Spinner />}
        </form>
      </section>
      {isLogged && history.push("/")}
    </section>
  );
};

export default Login;
