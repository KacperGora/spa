import Login from "../../components/Auth/Login/Login";
import Footer from "../../layout/footer/Footer";
import NavBar from "../../layout/navBar/NavBar";
import classes from "./LoginPage.module.css";
const LoginPage = () => {
  return (
    <>
      <NavBar />
      <div className={classes.main}>
        <Login />
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
