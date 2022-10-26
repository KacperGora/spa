import LoginForm from "../../components/Auth/Login/LoginForm";
import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";
import classes from "./LoginPage.module.css";
const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className={classes.main}>
        <LoginForm />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
