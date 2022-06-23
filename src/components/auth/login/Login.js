import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginActions } from "../../../store/loginSlice";
import { userActions } from "../../../store/usersSlice";

import Spinner from "../../UI/spinner/Spinner";
import classes from "./Login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.auth.isLogged);
  const history = useHistory();
  const [enteredMail, setEnteredMail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =useState()

    const loginSubmitHandler = (e) => {
    e.preventDefault();
    userLogin();
  };

  const userLogin = useCallback(async () => {
    try {
      setIsLoading(true);
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
     if(!response.ok){
      setError(true)
     }
setIsLoading(false);
      if (response.ok) {
        dispatch(loginActions.login());
        fetch(
          "https://aroundher-default-rtdb.europe-west1.firebasedatabase.app/users.json"
        ).then((data) => data.json()).then((response)=> {
          let user = []
          for(let key in response){
           user.push(response[key])
          }
        dispatch(userActions.setUser(...user.filter((user) => user.email === enteredMail)))(
          
        );
         
        
          
          })
      }
      const data = await response.json();
      if (data.email === "admin@test.pl") {
        dispatch(loginActions.admin(true));
      }
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
          {error && <p>Nie udana próba logowania.</p>}
        </form>
      </section>
      {isLogged && history.push("/")}
    </section>
  );
};

export default Login;
