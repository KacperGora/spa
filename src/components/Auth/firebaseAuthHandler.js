import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";

const firebaseAuthHandler = async (
  type,
  authCredentials,
  setIsLoading,
  setAuthError
) => {
  setIsLoading(true);

  if (type === "login") {
    let loggedUser;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        authCredentials.email,
        authCredentials.password
      );

      loggedUser = userCredential.user;
      localStorage.setItem("token", loggedUser.uid);
    } catch (error) {
      const { code } = error;
      if (code === "auth/wrong-password") {
        setAuthError("Podano nieprawidłowe dane.");
      } else if (code === "auth/user-not-found") {
        setAuthError("Nie znaleziono użytkownika.");
      } else setAuthError(code);
      setIsLoading(false);
      throw new Error(code);
    }
    setIsLoading(false);
    return loggedUser;
  } else if (type === "register") {
    let registeredUser;
    try {
      registeredUser = await createUserWithEmailAndPassword(
        auth,
        authCredentials.email,
        authCredentials.password
      );

      registeredUser.user && setIsLoading(false);
      updateProfile(registeredUser.user, {
        displayName: authCredentials.name,
      });
    } catch (error) {
      const { message } = error;
      if (message === "Firebase: Error (auth/email-already-in-use).") {
        setAuthError("Na podany email istnieje zarejestrowane konto.");
      }
      setIsLoading(false);
      throw new Error(message);
    }
    return registeredUser;
  }
};

export default firebaseAuthHandler;
