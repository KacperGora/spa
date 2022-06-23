import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import NavBar from "../../layout/navBar/NavBar";
import Spinner from "../../UI/spinner/Spinner";
import classes from "./Register.module.css";

const Register = () => {
  const [userName, setUserName] = useState('')
  const [userSecondName, setUserSecondName] = useState('')
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState(undefined);
  
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
    ).then((response) => {
      if (response.ok) {
        setStatus(true);
         fetch(
           "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/users.json",
           {
             method: "POST",
             body: JSON.stringify({
              email: userMail,
              name: userName,
              secondName: userSecondName,
              meetings: [],

             }),
             headers: {
               "Content-type": "application / json",
             },
           }
         );
      }
      setIsLoading(false);
      response.json();
    });

    setUserMail("");
    setUserPassword("");
  };
  const historyLoginPush = () => {
    history.push("/login");
  };
  return (
    <section>
      <NavBar />
      <section className={classes.container}>
        <div className={classes.container}>
          <form onSubmit={submitHandler}>
            <input onChange={(e)=> setUserName(e.target.value)} minLength='4' type='text' placeholder="Imię"/>
            <input onChange={(e)=> {setUserSecondName(e.target.value) }} placeholder='Nazwisko' type='text' />
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
            >
              
            </input>
            <button
              onClick={() => {
                history.push("/login");
              }}
            >
              Powrót do logowania
            </button>
            <button type="submit">Rejestracja</button>
            <div>
              {isLoading && <Spinner />}
            </div>
          </form>
          {status && (
            <p style={{ fontSize: "22px" }}>
              Sukces, za chwilę zostaniesz przekierowana do strony logowania.
            </p>
          )}
          {status && setTimeout(historyLoginPush, 3000)}
        </div>
      </section>
    </section>
  );
};

export default Register;
