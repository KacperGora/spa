import classes from "./Login.module.css";
import Footer from "../../../../layout/footer/Footer";
import LoginForm from "./LoginComponents/LoginForm";

const Login = () => {
  return (
    <section className={classes.container}>
      <section className={classes.container}>
        <LoginForm />
      </section>
      <Footer />
    </section>
  );
};

export default Login;
