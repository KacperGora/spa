import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginActions } from "../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store/usersSlice";
import setLoggedUser from "../utilities/setLoggedUser";
import FormInputCfg from "./useFormInputHandler";
import firebaseAuthHandler from "../components/Auth/firebaseAuthHandler";

function useAuthLogin() {
  const [authError, setAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const { ...loginParams } = FormInputCfg();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formConfiguration = [
    {
      type: "email",
      placeholder: "Adres email",
      hasError: loginParams.mail.hasError,
      onChange: loginParams.mail.valueChangeHandler,
      onBlur: loginParams.mail.inputBlurHandler,
      icon: <AlternateEmailIcon />,
    },
    {
      type: "password",
      placeholder: "Hasło",
      hasError: loginParams.password.hasError,
      onChange: loginParams.password.valueChangeHandler,
      onBlur: loginParams.password.inputBlurHandler,
      icon: <LockIcon />,
    },
  ];

  useEffect(() => {
    loginParams.mail.isValid &&
      loginParams.password.isValid &&
      setFormIsValid(true);
    !loginParams.mail.isValid &&
      !loginParams.password.isValid &&
      setFormIsValid(false);
  }, [loginParams.mail.isValid, loginParams.password.isValid]);

  const authCredentials = {
    email: loginParams.mail.value,
    password: loginParams.password.value,
  };

  async function loginSubmitHandler(e) {
    e.preventDefault();
    const user = await firebaseAuthHandler(
      "login",
      authCredentials,
      setIsLoading,
      setAuthError
    );

    const loggedUser = await setLoggedUser(loginParams.mail.value);
    dispatch(userActions.setUser(loggedUser));
    user.email === "admin@test.pl" && dispatch(loginActions.admin(true));
    localStorage.setItem("token", user.accessToken);
    dispatch(loginActions.login(user.accessToken));
    navigate("/");
  }

  return {
    formConfiguration,
    loginSubmitHandler,
    authError,
    isLoading,
    formIsValid,
  };
}

export default useAuthLogin;
