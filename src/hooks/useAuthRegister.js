import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import BadgeIcon from "@mui/icons-material/Badge";
import { useEffect, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FormInputCfg from "./useFormInputHandler";
import firebaseAuthHandler from "../components/Auth/firebaseAuthHandler";

import addUserToCollection from "./addUserToCollection";

function useAuthRegister() {
  const [authError, setAuthError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formIsValid, setFormIsValid] = useState(false);
  const { ...registerParams } = FormInputCfg();

  const registerFormConfiguration = [
    {
      type: "text",
      placeholder: "Imię",
      hasError: registerParams.name.hasError,
      onChange: registerParams.name.valueChangeHandler,
      onBlur: registerParams.name.inputBlurHandler,
      icon: <BadgeIcon />,
    },
    {
      type: "text",
      placeholder: "Nazwisko",
      hasError: registerParams.secondName.hasError,
      onChange: registerParams.secondName.valueChangeHandler,
      onBlur: registerParams.secondName.inputBlurHandler,
      icon: <DriveFileRenameOutlineIcon />,
    },
    {
      type: "email",
      placeholder: "Adres email",
      hasError: registerParams.mail.hasError,
      onChange: registerParams.mail.valueChangeHandler,
      onBlur: registerParams.mail.inputBlurHandler,
      icon: <AlternateEmailIcon />,
    },
    {
      type: "tel",
      placeholder: "Numer telefonu",
      hasError: registerParams.phoneNumber.hasError,
      onChange: registerParams.phoneNumber.valueChangeHandler,
      onBlur: registerParams.phoneNumber.inputBlurHandler,
      icon: <PhoneIcon />,
    },
    {
      type: "password",
      placeholder: "Hasło",
      hasError: registerParams.password.hasError,
      onChange: registerParams.password.valueChangeHandler,
      onBlur: registerParams.password.inputBlurHandler,
      icon: <LockIcon />,
    },
  ];
  useEffect(() => {
    if (
      registerParams.mail.isValid &&
      registerParams.password.isValid &&
      registerParams.phoneNumber.isValid &&
      registerParams.secondName.isValid &&
      registerParams.name.isValid
    ) {
      setFormIsValid(true);
    } else setFormIsValid(false);
  }, [
    registerParams.mail.isValid,
    registerParams.name.isValid,
    registerParams.password.isValid,
    registerParams.phoneNumber.isValid,
    registerParams.secondName.isValid,
  ]);

  const authCredentials = {
    email: registerParams.mail.value,
    password: registerParams.password.value,
    name: registerParams.name.value,
    phoneNumber: registerParams.phoneNumber.value,
    secondName: registerParams.secondName.value,
  };

  async function registerSubmitHandler(e) {
    e.preventDefault();
    const user = await firebaseAuthHandler(
      "register",
      authCredentials,
      setIsLoading,
      setAuthError
    );
    user && addUserToCollection(authCredentials);
  }

  return {
    registerFormConfiguration,
    formIsValid,
    registerSubmitHandler,
    isLoading,
    authError,
  };
}

export default useAuthRegister;
