import classes from "./Login.module.css";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <section className={classes.container}>
      <LoginForm />
    </section>
  );
};

export default Login;
