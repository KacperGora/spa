import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./Login.module.css";
const Login = () => {
  const history = useHistory();
  return (
    <section className={classes.container}>
      <section className={classes.container}>
       
          <input type="email" placeholder="Email"></input>
          <input type="password" placeholder="password"></input>
          <button>Zaloguj</button>
          <button
            onClick={() => {
              history.push("register");
            }}
          >
            Nie masz konta?
          </button>
      
      </section>
    </section>
  );
};

export default Login;
