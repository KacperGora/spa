import { useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "../layout/NavBar";
import classes from './Register.module.css'

const Register = () => {
  useEffect(()=> {}, [])
  return (
    <section className={classes.cta}>
      <NavBar />
      <div className={classes.container}>
        <input
          className={classes.input}
          type="text"
          placeholder="Email"
        ></input>
        <input
          className={classes.input}
          type="password"
          placeholder="password"
        ></input>
        <button>Rejestruj</button>
      </div>
    </section>
  );
};

export default Register;
