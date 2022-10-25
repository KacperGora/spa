import Footer from "../../../layout/footer/Footer";
import classes from "./Login.module.css";
import LoginForm from "./LoginForm";


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
