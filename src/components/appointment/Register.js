import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Link from "react-scroll/modules/components/Link";

import NavBar from "../mainPage/navBarSection/NavBar";
import Spinner from "../UI/spinner/Spinner";
import classes from "./Register.module.css";

const Register = () => {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mailIsValid, setMailIsValid] = useState(false);
  const [mailTouched, setMailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const history = useHistory();
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGWo9-dHn91oycTewIhxo2TyM8C8ZOEdw",
      {
        method: "POST",
        body: JSON.stringify({
          email: userMail,
          password: userPassword,
          returnSecureToken: true,
        }),
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then((response) => {
        setIsLoading(false);
        response.json();
      })
      .then((data) => console.log(data));
    setUserMail("");
    setUserPassword("");
  };

  return (
    <section>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.container}>
          <form onSubmit={submitHandler}>
            <input
              onChange={(e) => setUserMail(e.target.value)}
              type="mail"
              value={userMail}
              required
              onBlur={() => {
                setMailTouched(true);
              }}
            ></input>
            <input
              onChange={(e) => setUserPassword(e.target.value)}
              type="password"
              minLength="5"
              value={userPassword}
              required
              onBlur={() => {
                setPasswordTouched(true);
              }}
            ></input>
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              Powrót do logowania
            </button>
            <button type="submit">Rejestracja</button>
            {isLoading && <Spinner />}
          </form>
          {!mailIsValid && <p>Invalid email</p>}
        </div>
      </section>
    </section>
  );
};

export default Register;
