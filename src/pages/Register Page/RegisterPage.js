import NavBar from "../../layout/navBar/NavBar";
import RegisterForm from "../../components/Auth/Register/RegisterForm";
import Footer from "../../layout/footer/Footer";
import classes from "./RegisterPage.module.css";
const Register = () => {
  return (
    <>
      <NavBar />
      <div className={classes.main}>
        <RegisterForm />
      </div>

      <Footer />
    </>
  );
};

export default Register;
